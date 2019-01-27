from flask import Flask, render_template, jsonify, request, abort
from flask_cors import CORS
from audio import Audio
from video import Video
from threading import Thread

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True


SPEECH = None
def start_speech():
    global SPEECH
    SPEECH = Audio()
    SPEECH.run()

VISION = None
def start_vision():
    global VISION
    VISION = Video()
    VISION.run()


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/start', methods=['GET'])
def start_recording():
    Thread(target=start_speech).start()
    Thread(target=start_vision).start()
    return jsonify(success=True)


@app.route('/current', methods=['GET'])
def get_scores():
    global VISION
    global SPEECH
    scores = {
        'video': {
            'displacement': VISION.getTotalDisplacement(),
            'frames': VISION.getNumFrames(),
            'currentEmotion': VISION.getCurrentEmotion(),
            'emotions': VISION.getEmotions()
        },
        'audio': SPEECH.getSummary()
    }
    return jsonify(data=scores)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
