from transcribe_streaming_mic import MicrophoneStream, RATE, CHUNK
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
import sys
import time

with open('fillers.txt') as file:
    fillers = file.readlines()


class Audio(object):

    def __init__(self):
        self.summary = {
            'transcript': '',
            'crutch_count_by_line': [],
            'wpm_by_line': [],
            'counts': {}
        }
        for filler in fillers:
            self.summary['counts'][filler] = 0
        # See http://g.co/cloud/speech/docs/languages
        # for a list of supported languages.
        language_code = 'en-US'  # a BCP-47 language tag

        client = speech.SpeechClient()
        config = types.RecognitionConfig(
            encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=RATE,
            language_code=language_code)
        streaming_config = types.StreamingRecognitionConfig(
            config=config,
            interim_results=True)

        self.last_time = time.time()
        with MicrophoneStream(RATE, CHUNK) as stream:
            audio_generator = stream.generator()
            requests = (types.StreamingRecognizeRequest(audio_content=content)
                        for content in audio_generator)

            responses = client.streaming_recognize(streaming_config, requests)

            # Now, put the transcription responses to use.
            self.listen_print_loop(responses)

    def listen_print_loop(self, responses):
        """Iterates through server responses and prints them.
        The responses passed is a generator that will block until a response
        is provided by the server.
        Each response may contain multiple results, and each result may contain
        multiple alternatives; for details, see https://goo.gl/tjCPAU.  Here we
        print only the transcription for the top alternative of the top result.
        In this case, responses are provided for interim results as well. If the
        response is an interim one, print a line feed at the end of it, to allow
        the next result to overwrite it, until the response is a final one. For the
        final one, print a newline to preserve the finalized transcription.
        """
        num_chars_printed = 0
        for response in responses:
            if not response.results:
                continue

            # The `results` list is consecutive. For streaming, we only care about
            # the first result being considered, since once it's `is_final`, it
            # moves on to considering the next utterance.
            result = response.results[0]
            if not result.alternatives:
                continue

            # Display the transcription of the top alternative.
            transcript = result.alternatives[0].transcript

            # Display interim results, but with a carriage return at the end of the
            # line, so subsequent lines will overwrite them.
            #
            # If the previous result was longer than this one, we need to print
            # some extra spaces to overwrite the previous result
            overwrite_chars = ' ' * (num_chars_printed - len(transcript))

            if not result.is_final:
                sys.stdout.write(transcript + overwrite_chars + '\r')
                sys.stdout.flush()

                num_chars_printed = len(transcript)

            else:
                print(transcript + overwrite_chars)

                crutch_word_count = 0
                for word in fillers:
                    word_count = transcript.count(word)
                    crutch_word_count += word_count
                    self.summary['counts'][word] += word_count

                self.summary['transcript'] = self.summary['transcript'] + transcript
                self.summary['crutch_count_by_line'].append(crutch_word_count)
                self.summary['wpm_by_line'].append(len(transcript.split(' ')) / ((time.time() - self.last_time) / 60))
                print(str(len(transcript.split(' ')) / ((time.time() - self.last_time) / 60)))
                self.last_time = time.time()

                num_chars_printed = 0

    def getSummary(self):
        return self.summary
