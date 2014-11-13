#!/usr/bin/env node

var Hapi = require('hapi');

Hapi.Pack.compose(require('./manifest.js'), function(error, pack) {
	if (error)
		throw error; // something bad happened loading the plugin

	pack.start(function () {
		for (var serverIndex in pack.servers)
			console.log('Server running on', pack.servers[serverIndex].info.uri);
	});
});
