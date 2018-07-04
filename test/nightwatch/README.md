# dagwallet-web tests

# dagwallet-web tests
#Dagcoin web wallet testing project

[![N|Solid](https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAPGAAAAJDY2YWY4Mzk2LTBkYWQtNGM1MC1iYTdhLTQ4OTY1YjU1ZGJiNQ.png)](http://www.testreel.com)

This project is powered by Nightwatch.js

- Developers: Viljar Võidula(special thanks to Priit Kallas for TS example)
 

# Project setup:
## Commands

- ```git clone``` [Clone repository]
- ```yarn``` [Install all dependencies described in package.json]
- ```yarn selenium-setup``` [Install selenium dependencies such as server and webdriver ]
- ```yarn start-desktop``` [Run tests in NW.js container]
- ```yarn start-android``` [Run tests in android emulator]
- ```export ENV_URL='http://{YourEnvironmentUrl}.ee/'``` [Set env url for tests]

# NW.js setup:
## Commands
- ```npm install nwjs -g``` [Install NW version manager]
- ```http_proxy=http://127.0.0.1:8787 nw install 0.31.4-sdk``` [Install NW version manager]
- ```http_proxy=http://127.0.0.1:8787 nw install 0.31.4-sdk```

# APPIUM AND ANDROID EMULATOR 
- ```npm install -g appium@1.6.5``` [Install appium, 1.6.5 has been tested at current build and is working properly, newer versions may have problems with context switching to WEBVIEW]

- Setup android studio and install Android Emulator NB! SDK_25 only! newer versions might have problems and are not tested yet

# CONFIGURE .ENV in nightwatch root directory

```json
#NW.js PATH
NW_CHROMEDRIVER='/home/{user}/.nwjs/0.31.4-sdk/chromedriver'
NW_APP='{PATH TO NW APP ROOT}'
#APPIUM
APP_APK='{PATH TO APK FILE}'
ANDROID_PLATFORM='7.1'
DEVICE_NAME='emulator-5554'

```   
  
