#!/bin/bash
Green='\033[0;32m'
Red='\033[0;31m'
CloseColor='\033[0m'

NodeVersion="v8.11.3"
environment=$1

NWVersion=0.24.3

echo "${Green}* Checking Node version...${CloseColor}"
if ! node -v | grep -q ${NodeVersion}; then
 echo "${Red}* ERROR. Please use Node v8.11.3...${CloseColor}"
 exit
fi
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

echo "${Green}* Installing bower dependencies...${CloseColor}"
bower install

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

echo "${Green}* Installing npm dependencies...${CloseColor}"
npm install

Sqlite3Path='./node_modules/sqlite3/lib/binding'

if ! gem list sass -i; then
  echo "${Green}* Installing sass...${CloseColor}"
  sudo gem install sass
fi

if [ "$(uname)" == "Darwin" ]; then
  if [ -d "${Sqlite3Path}/node-webkit-v0.14.7-darwin-x64" ]; then
    grunt build:${environment}
    exit
  fi
  mkdir "${Sqlite3Path}/node-webkit-v0.14.7-darwin-x64"
  cp "${Sqlite3Path}/node-v57-darwin-x64/node_sqlite3.node" "${Sqlite3Path}/node-webkit-v0.14.7-darwin-x64"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  if [ -d "${Sqlite3Path}/node-webkit-v0.14.7-linux-x64" ]; then
    grunt build:${environment}
    exit
  fi
  mkdir "${Sqlite3Path}/node-webkit-v0.14.7-linux-x64"
  cp "${Sqlite3Path}/node-v57-linux-x64/node_sqlite3.node" "${Sqlite3Path}/node-webkit-v0.14.7-linux-x64"
fi
grunt build:${environment}
