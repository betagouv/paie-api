var Hapi = require('hapi');


/** The instantiated Paie-API server pack.
*
*@type	{Hapi.Pack}
*/
var pack;


/** Starts a Paie-API server.
*
*@param	{Function<error|null, Hapi.Pack>}	A callback that will be called once the server has been started.
*/
var start = function start(callback) {

	Hapi.Pack.compose(require('./manifest.js'), function(error, pack) {
		if (error)
			return callback(error);

		pack.servers[0].route({
			method: 'GET',
			path: '/sandbox/{param*}',
			handler: {
				directory: {
					path: 'dist'
				}
			}
		});

		pack.start(function(error) {
			callback(error, pack);
		});
	});

}

exports.start	= start;
