npm install && \
npm run deps && \
npm run babel && \
cp -r node_modules/bulma/css . && \
cp -r src/download_video lib/ && \
pyinstaller src/download_video/app.py --distpath lib/download_video_dist && \
{
    ./node_modules/.bin/electron-packager . \
        --ignore="lib/download_video/" \
        --ignore="scripts" \
        --ignore="src/" \
        --ignore="venv/" \
        --ignore=".babelrc" \
        --ignore=".gitignore" \
        --ignore="requirements.txt" \
        --ignore="app.spec" \
        --ignore="build/"
}