FROM python:3.5

ENV CPATH=/usr/local/include/python3.5m

RUN mkdir /osu
WORKDIR /osu

ADD requirements.txt /osu/requirements.txt
RUN pip install --no-cache-dir --src /usr/src -r requirements.txt

ADD . /osu
