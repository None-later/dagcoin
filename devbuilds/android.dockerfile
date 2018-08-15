FROM ubuntu:16.04

WORKDIR /usr/src/app

# Install dependencies
RUN apt-get update && apt-get install -y software-properties-common curl git sudo make g++ ruby ruby-dev tar bzip2 wget \
&& curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

RUN apt-get install -y nodejs \
&& npm install -g npm@latest

# Install npm dependencies
RUN npm install -g grunt-cli bower cordova phonegap \
&& echo '{ "allow_root": true }' > /root/.bowerrc

RUN gem install sass --no-user-install

# Install android dependencies
RUN apt-get install -y unzip gradle

# Install android SDK
ENV ANDROID_HOME=/opt/android-sdk-linux
RUN mkdir -p $ANDROID_HOME \
&& apt-get install openjdk-8-jdk -y \
&& cd $ANDROID_HOME \
&& wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip \
&& unzip tools_r25.2.3-linux.zip \
&& rm tools_r25.2.3-linux.zip

RUN cd ${ANDROID_HOME}/tools \
&& ( sleep 5 && while [ 1 ]; do sleep 1; echo y; done ) | ./android update sdk --no-ui -a --filter platform-tool,build-tools-26.0.2,android-26
