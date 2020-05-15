"""Flask app for download_video()."""

import certifi
from download_video import download_video
from flask import Flask
from flask import request

certifi.where()

app = Flask(__name__)


@app.route("/download_video", methods=["POST"])
def _download_video():
    payload = request.get_json()
    message = download_video(payload["url"], payload["ydl_opts"])

    return message


if __name__ == "__main__":
    # Set env variable for debug mode in development
    app.run(port=5000)
