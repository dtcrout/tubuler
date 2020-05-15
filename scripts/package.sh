./node_modules/.bin/electron-packager . \
    --ignore="lib/download_video/" \
    --ignore="scripts" \
    --ignore="src/" \
    --ignore="venv/" \
    --ignore=".babelrc" \
    --ignore=".gitignore" \
    --ignore="requirements.txt"