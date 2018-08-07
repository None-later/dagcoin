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

RUN cd .. && mkdir -p byteballbuilds
COPY . .

# Prepare wallet
RUN make prepare-dev-tn
RUN make prepare-package-tn

RUN apt-get install -y devscripts debhelper dh-virtualenv
# Create deb package
RUN make prepare-package-deb-tn

CMD export PACKAGE_VERSION=$(node -p -e "require('./package.json').version") \
&& cp /usr/src/byteballbuilds/dagcoin-wallet-tn_${PACKAGE_VERSION}_all.deb /data/dagcoin-wallet-tn.deb
