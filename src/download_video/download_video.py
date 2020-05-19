"""Simple wrapper for youtube-dl."""

import youtube_dl


def parse_error(error):
    if error.startswith("ERROR:"):
        # Return the first phrase of the error
        return error.split(":")[1].split(".")[0]
    else:
        return error


def download_video(url, ydl_opts={}):
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download([url])
        except Exception as e:
            error = str(e)
            return {"status": "-1", "message": error, "error": parse_error(error)}

    return {"status": "1", "message": "Video downloaded...", "error": ""}
