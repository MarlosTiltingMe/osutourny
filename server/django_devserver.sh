#! /bin/bash
python /osu/manage.py migrate --noinput
python /osu/manage.py runserver 0.0.0.0:8000
