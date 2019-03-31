from flask import Flask, render_template, jsonify, request, abort
from flask_cors import CORS
from audio import Audio
from video import Video
from threading import Thread
import json

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

@app.route('/', methods=['GET'])
def index():
    return 'hi'

@app.route('/detect', methods=['GET'])
def detect():
    request.data.decode("utf-8").split(';base64,')[1][:-1]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
