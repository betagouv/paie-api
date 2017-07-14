npm stop

git fetch &&
git checkout --force --detach origin/${2:-master} &&
git clean --force

./install.sh

[[ $# -gt 0 ]] && npm config set paie-api:port $1	# if not set, will use the default from package.json

npm start &
