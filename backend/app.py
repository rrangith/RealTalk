from flask import Flask, render_template, jsonify, request, abort
from audio import Audio
from video import Video
from threading import Thread

app = Flask(__name__)
app.config['DEBUG'] = True


SPEECH = None
def start_speech():
    global SPEECH
    SPEECH = Audio()

VISION = None
def start_vision():
    global VISION
    VISION = Video()


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start_recording():
    Thread(target=start_speech).start()
    Thread(target=start_vision).start()
    return jsonify(success=True)


@app.route('/current', methods=['POST'])
def get_scores():
    scores = {
        'audio': SPEECH.getSummary(),
        'video': {
            'displacement': VISION.getTotalDisplacement(),
            'frames': VISION.getNumFrames()
        }
    }
    return jsonify(data=scores)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)

