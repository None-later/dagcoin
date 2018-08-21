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
- ```yarn selenium-setup``` [Install selenium dependencies such as server and webdriver NB! NW JS SDK must be installed before starting tests + .env configured + JAVA 8 JRE]
- ```yarn start-desktop``` [Run tests in NW.js container]
- ```yarn start-android``` [Run tests in android emulator]
- ```export ENV_URL='http://{YourEnvironmentUrl}.ee/'``` [Set env url for tests]


# APPIUM AND ANDROID EMULATOR 
- ```CHROMEDRIVER_VERSION=2.28 npm install appium@1.8.0 -g``` [Install appium, 1.8.0 has been tested at current build and is working properly, newer versions may have problems with context switching to WEBVIEW]

- Setup android studio and install Android Emulator NB! SDK_25 only! newer versions might have problems and are not tested yet
# Remote executions
- !! Remote execution is supported only for ANDROID application !!
- To execute tests in remote environment you need selenium grid or similar selenium server
- To use Testreel browser cluster You must specifiy access parameters in your environment variables + use ssl 

# CONFIGURE .ENV in nightwatch root directory

```json
#NW.js PATH
NW_CHROMEDRIVER='/home/{user}/.nwjs/0.24.3-sdk/chromedriver'
NW_APP='/home/{user}/Projects/dag-wallet'
#APPIUM
APP_APK='{apk path - local + http+https paths are supported}'
ANDROID_PLATFORM='7.1'
DEVICE_NAME='emulator-5554'

#SELENIUM
SELENIUM_HOST='{OPTIONAL: desired selenium host}' ! Should be defined for remote execution fe: selenium-grid.testreel.com
SELENIUM_PORT='{OPTIONAL: desired selenium port}' ! Should be defined for remote execution fe: 443 for estreel grid
GRID_USER='USER' ! Remote grid user
GRID_SECRET='SECRET' !Remote grid access_key 
USE_SSL={OPTIONAL: if using 443 port and SSL then true, else false/undefined} ! If using testreel grid then true 
```   
  
