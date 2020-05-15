PYTHON=python3
ENV_NAME=venv

if [ ! -d $ENV_NAME ]
then
    $PYTHON -m venv $ENV_NAME
fi

$ENV_NAME/bin/python -m pip install -r requirements.txt
