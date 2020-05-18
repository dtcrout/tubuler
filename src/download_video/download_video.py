"""Simple wrapper for youtube-dl."""

import youtube_dl


def download_video(url, ydl_opts={}):
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download([url])
        except Exception as e:
            return {"status": "-1", "message": str(e)}

    return {"status": "1", "message": "Video downloaded..."}
