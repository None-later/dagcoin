#!/bin/bash

Green='\033[0;32m'
Red='\033[0;31m'
CloseColor='\033[0m'

NodeVersion="v8.11.3"
NWVersion=0.24.3

echo "${Green}* Checking Node version...${CloseColor}"
if ! node -v | grep -q ${NodeVersion}; then
 echo "${Red}* ERROR. Please use Node v8.11.3...${CloseColor}"
 exit
fi
echo "${Green}* Node version OK${CloseColor}"
if ! type bower > /dev/null; then
  echo "${Red}* ERROR. Please install bower${CloseColor}"
  echo "${Red}* npm install -g bower${CloseColor}"
  exit
fi
if ! type grunt > /dev/null; then
  echo "${Red}* ERROR. Please install grunt${CloseColor}"
  echo "${Red}* npm install -g grunt-cli${CloseColor}"
  exit
fi

Sqlite3Path='./node_modules/sqlite3/lib/binding'

if [ "$(uname)" == "Darwin" ]; then
 PackagePath='../byteballbuilds/DagWallet/osx64/dagcoin-wallet.app/Contents/Resources/app.nw/'
 Action=dmg
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  if [ "$1" == "testnet" ]; then
    PackagePath='../byteballbuilds/DagWallet-tn/linux64/'
    Action=linux64:testnet
  else
    PackagePath='../byteballbuilds/DagWallet/linux64/'
    Action=linux64:live
  fi
fi

grunt desktop:$1

if [ -d "./node_modules" ]; then
  echo "Moving existing node_modules to temp ..."
  mv "./node_modules" "./node_modules-temp"
fi

echo "${Green}* Setting NW.js recompile...${CloseColor}"
# Setup target NW.js version
export npm_config_target=${NWVersion}
# Setup build architecture, ia32 or x64
export npm_config_arch=x64
export npm_config_target_arch=x64
# Setup env for modules built with node-pre-gyp
export npm_config_runtime=node-webkit
export npm_config_build_from_source=true
# Setup nw-gyp as node-gyp
export npm_config_node_gyp=$(which nw-gyp)

echo "Installing production dependencies..."

npm install --production

echo "Copying ..."

if [ "$(uname)" == "Darwin" ]; then
  if [ ! -d "${Sqlite3Path}/node-webkit-v0.14.7-darwin-x64" ]; then
    mkdir "${Sqlite3Path}/node-webkit-v0.14.7-darwin-x64"
  fi
  cp "${Sqlite3Path}/node-v57-darwin-x64/node_sqlite3.node" "${Sqlite3Path}/node-webkit-v0.14.7-darwin-x64"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  if [ -d "${Sqlite3Path}/node-webkit-v0.14.7-linux-x64" ]; then
    grunt build:$1
    exit
  fi
  mkdir "${Sqlite3Path}/node-webkit-v0.14.7-linux-x64"
  cp "${Sqlite3Path}/node-v57-linux-x64/node_sqlite3.node" "${Sqlite3Path}/node-webkit-v0.14.7-linux-x64"
fi

cp -r "./node_modules" "${PackagePath}"

rm -rf "./node_modules"

if [ -d "./node_modules-temp" ]; then
  echo "Moving temp node_modules back ..."
  mv "./node_modules-temp" "./node_modules"
fi

grunt build:$1

grunt ${Action}
