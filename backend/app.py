from flask import Flask, render_template, jsonify, request, abort
from audio import Audio
from video import Video

app = Flask(__name__)
app.config['DEBUG'] = True


SPEECH = None
VISION = None


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start_recording():
    global SPEECH, VISION
    SPEECH = Audio()
    VISION = Video()
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

