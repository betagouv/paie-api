#!/bin/sh
#
# Params:
# $1 [optional] port to use.
# $2 [optional] Git reference to pull. Defaults to master.
LOG_FILE='../log.txt'

set -x

cd `dirname $0`

echo "`date` Deploying…" >> "$LOG_FILE"

# killall -u `whoami` node >> "$LOG_FILE" 2>> "$LOG_FILE"	# if we're updating, stop the server
pm2 stop paie-api

git fetch

git checkout --force --detach origin/${2:-master}

git clean --force

git submodule update --init --recursive

npm install

if [[ $# -gt 0 ]]
then npm config set paie-api:port $1	# if not set, will use the default from package.json
fi

# npm start >> "$LOG_FILE" &
pm2 start npm --name "paie-api" -- run start

