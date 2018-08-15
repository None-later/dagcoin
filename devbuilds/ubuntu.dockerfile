FROM ubuntu:16.04

WORKDIR /usr/src/app

# Install dependencies
RUN apt-get update && apt-get install -y software-properties-common curl git sudo make g++ ruby ruby-dev tar bzip2 wget \
&& curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

RUN apt-get install -y nodejs \
&& npm install -g npm@latest

# Install npm dependencies
RUN npm install -g grunt-cli bower cordova phonegap nw-gyp \
&& echo '{ "allow_root": true }' > /root/.bowerrc

COPY linux.patch linux.patch
RUN mkdir -p ~/.nw-gyp/0.24.3 \
&& wget http://node-webkit.s3.amazonaws.com/v0.24.3/nw-headers-v0.24.3.tar.gz \
&& tar -xzvf ./nw-headers-v0.24.3.tar.gz -C ~/.nw-gyp/0.24.3 --strip-components=1 && \
echo 9 > ~/.nw-gyp/0.24.3/installVersion && \
patch -u ~/.nw-gyp/0.24.3/common.gypi ./linux.patch
