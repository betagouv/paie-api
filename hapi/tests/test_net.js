'use strict';

var Test = require('tape'),
	Path = require('path'),
	Hapi = require('hapi'),
	Enjoi = require('enjoi'),
	Swaggerize = require('swaggerize-hapi');

Test('api', function (t) {
	var server;

	t.test('server', function (t) {
		t.plan(1);

		server = new Hapi.Server();

		server.pack.register({
			plugin: Swaggerize,
			options: {
				api: require('../../swagger.json'),
				handlers: Path.join(__dirname, '../handlers')
			}
		}, function (err) {
			t.error(err, 'No error.');
		});
	});


	t.test('test get /net', function (t) {

		var responseSchema = Enjoi({
			'type': "integer",
			'minimum': 0
		}, {
			'#': require('../../swagger.json')
		});

		var options = {
			method: 'get',
			url: '/api/net'
		};

		server.inject(options, function (res) {
			t.strictEqual(res.statusCode, 200, 'get /net 200 status.');
			responseSchema.validate(res.body, function (error) {
				t.ok(!error, 'Response schema valid.');
			});
			t.end();
		});
	});


});
