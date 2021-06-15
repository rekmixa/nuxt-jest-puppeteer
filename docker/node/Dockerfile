FROM ubuntu:20.04

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install -g yarn

# Install dependencies
RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get install -yq curl libgconf-2-4 ffmpeg

# Install Google Chrome
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main' >> /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && \
  apt-get install -y google-chrome-unstable --no-install-recommends && \
  rm -fr /var/lib/apt/lists/* && \
  apt-get purge --auto-remove -y curl && \
  rm -fr /src/*.deb

COPY bootstrap.sh /usr/local/bin/bootstrap.sh
RUN chmod +x /usr/local/bin/bootstrap.sh
RUN /usr/local/bin/bootstrap.sh
