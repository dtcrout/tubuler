# tubuler 🤙

<p align="center">
  <img src="resources/images/tubuler.png" width="600">
</p>

## What is tubuler?

tubuler is a free and open source application for downloading YouTube videos, based on the [youtube-dl](http://ytdl-org.github.io/youtube-dl/) command line tool. The application is built on [Electron](https://www.electronjs.org/) with front-end components provided by [Bulma](https://bulma.io/). Under the hood is a [Flask](https://flask.palletsprojects.com/en/1.1.x/) back-end with youtube-dl.

tubuler was built with *accessibility*, *simplicity* and *openness* in mind. youtube-dl is one of the many great free and open source tools out there. As a command line tool however, youtube-dl poses a barier for users who might not be familiar with the CLI. tubuler was made to change that.

Pronouncing *tubuler* is similar to *tubular*, a term which was used by surfers and skaters in the 80's.

## How to Use

Using tubuler is easy: simply paste the YouTube video link into the app and click download. tubuler automatically chooses the best video and audio quality. The download time varies depending on the length of the video and its quality at which it was uploaded. tubuler can also work on other [video streaming sites](https://ytdl-org.github.io/youtube-dl/supportedsites.html).

tubuler is available for MacOS (*download coming soon*). Builds for Windows and Linux may be available in the future. You can also download this repo and build tubuler for your platform of choice (see [Building tubuler](#Building-tubular)).

## Development

### Requirements

* [Node.js](https://nodejs.org/en/)
* [Python 3](https://www.python.org/)

### Getting Started

To get a development environment up and running, clone this repo and run the following steps:

1. `npm install`
    - Installs Node.js dependencies
2. `npm run deps`
    - Creates Python virtual environment and installs dependencies
3. `npm run babel`
    - Transcribes source files
4. `cp -r node_modules/bulma/css .`
    - Copies over Bulma CSS files for front-end
5. `npm start`
    - Starts tubuler

### How It Works

tubuler is split into two different parts: the Electron front-end and the Flask back-end. Running the app starts the Flask app in the background. When the user submits a URL, a REST call is made to the back-end which downloads the video to the user's selected location.

The front-end is developed in JavaScript [ES6](https://en.wikipedia.org/wiki/ECMAScript) to standardize development. The code which is developed on and the code which is used by Electron are separated into different directories. Development is done in `src/` and then transcribed into another directory `lib/` using [Babel](https://babeljs.io/). Looking into `package.json` can give more clarity into the development workflow.

The back-end is developed in Python using the [PEP-8](https://www.python.org/dev/peps/pep-0008/) standard. `npm run deps` creates a virtual environment `venv/` where all Python dependencies are contained. All Python source files are in the `src/download_video/` directory.

The Flask app can be ran independently by running the following command in the root of the tubuler:

```
$ ./venv/bin/python src/download_video/app.py
```

Once the app is running, we can use [cURL](https://en.wikipedia.org/wiki/CURL) to call the Flask app:

```
$ curl -X POST -H "Content-type: application/json" \
               -H "Accept: application/json" \
               -d '{"url": "[youtube_video_url]", "ydl_opts": {"outtmpl": "[path]/video.mp4"}}' "localhost:5000/download_video"
```

### Building tubuler

Coming soon...

## Stack

* [Babel](https://babeljs.io/)
* [Bulma](https://bulma.io/)
* [Electron](https://www.electronjs.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [youtube-dl](http://ytdl-org.github.io/youtube-dl/)

## License

[MIT](LICENSE)
