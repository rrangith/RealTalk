from flask import Flask, render_template, redirect, url_for, jsonify

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)

