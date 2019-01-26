from flask import Flask, render_template, redirect, url_for, jsonify, request, abort
from speech import SpeechHandler

app = Flask(__name__)
app.config['DEBUG'] = True


SPEECH = None
VISION = None


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start_recording():
    VISION = SpeechHandler()
    return jsonify(success=True)


@app.route('/current', methods=['POST'])
def get_scores():
    if not request.json:
        return abort(400)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)

