#!/usr/bin/env node

function log(error, pack) {
	if (error)
		console.error(error);

	for (var serverIndex in pack.servers)
		console.log('Server running on', pack.servers[serverIndex].info.uri);
}

require('./server.js').start(log);
