from flask import Flask, render_template, redirect, url_for, jsonify, request, abort

app = Flask(__name__)
app.config['DEBUG'] = True
web_socket_port = 5006
web_socket_client_url = "ws://localhost:5006"


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start_recording():
    if not request.json:
        return abort(400)

    data = request.json
    width = data['width']
    height = data['length']
    if not isinstance(width, int) or not isinstance(height, int):
        return abort(400)

    return jsonify(success=True)


@app.route('/current', methods=['POST'])
def get_scores():
    if not request.json:
        return abort(400)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)

