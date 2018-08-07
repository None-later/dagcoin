FROM ubuntu:16.04

WORKDIR /usr/src/app

# Install dependencies
RUN apt-get update && apt-get install -y software-properties-common curl git sudo make g++ ruby ruby-dev tar bzip2 \
&& curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
&& apt-get install -y nodejs \
&& npm install -g npm@latest

# Install npm dependencies
RUN npm install -g grunt-cli bower cordova phonegap \
&& echo '{ "allow_root": true }' > /root/.bowerrc

# Install android dependencies
RUN apt-get update \
&& apt-get install -y wget unzip gradle

# Install android SDK
ENV ANDROID_HOME=/opt/android-sdk-linux
RUN mkdir -p $ANDROID_HOME \
&& apt-get install openjdk-8-jdk -y \
&& cd $ANDROID_HOME \
&& wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip \
&& unzip tools_r25.2.3-linux.zip \
&& cd tools \
&& ( sleep 5 && while [ 1 ]; do sleep 1; echo y; done ) | ./android update sdk --no-ui -a --filter platform-tool,build-tools-26.0.2,android-26

COPY . .

# Prepare wallet
RUN make prepare-dev-tn

# Create android apk
RUN make android-package-tn

CMD cp /usr/src/app/cordova/project-ANDROID/platforms/android/build/outputs/apk/debug/android-debug.apk /data/android-debug.apk
