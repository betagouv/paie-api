#!/bin/sh
#
# Params:
# $1 [optional] port to use.
# $2 [optional] Git reference to pull. Defaults to master.

cd `dirname $0`

killall -u `whoami` node >> log.txt 2>> log.txt	# if we're updating, stop the server

git pull git@github.com:sgmap/paie-api.git ${2:-master}

npm install

if [[ $# -gt 0 ]]
then npm config set paie-api:port $1	# if not set, will use the default from package.json
fi

npm start >> log.txt &
