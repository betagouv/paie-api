#!/usr/bin/env node

var Hapi = require('hapi'),
	Swaggerize = require('swaggerize-hapi');

var server = new Hapi.Server(process.env.npm_package_config_port);

// The mount point is specified by the swagger's `basePath` property.
server.pack.register({
	plugin: Swaggerize,
	options: {
		api: require('./swagger.json'),
		handlers: './hapi/handlers',
		docspath: '/'
	}
}, function (error) {
	server.start(function () {
		server.plugins.swagger.setHost(server.info.host + ':' + server.info.port);
	});
});

console.log('Server running on', server.info.host + ':' + server.info.port);
