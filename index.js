#!/usr/bin/env node

function log(error, pack) {
	if (error)
		console.error(error);

	pack.register({
		plugin: require('good'),
		options: {
			reporters: [ {
				reporter	: require('good-console'),
				args		: [ { log: '*', request: '*' } ]
			} ]
		}
	}, function(err) {
		if (err)
			console.error(err);
	});

	for (var serverIndex in pack.servers)
		console.log('Server running on', pack.servers[serverIndex].info.uri);
}

require('./server.js').start(log);
