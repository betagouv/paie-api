var Hapi = require('hapi');


/** The instantiated Paie-API server pack.
*
*@type	{Hapi.Pack}
*/
var pack;


/** Initializes the Paie-API server.
*
*@param	{Function<error|null, Hapi.Pack>}	A callback that will be called once the server has been started.
*/
function init(callback) {
	Hapi.Pack.compose(require('./manifest.js'), function(error, newPack) {
		if (error)
			return callback(error);

		newPack.servers[0].route([{
			method: 'GET',
			path: '/{param*}',
			handler: {
				directory: {
					path: 'homepage'
				}
			}
		}, {
			method: 'GET',
			path: '/api/doc/',
			handler: {
				file: {
					path: 'ui/index.html'
				}
			}
		}, {
			method: 'GET',
			path: '/fillon/{param*}',
			handler: {
				directory: {
					path: 'fillon'
				}
			}
		}, {
			method: 'GET',
			path: '/api/doc/{param*}',
			handler: {
				directory: {
					path: 'ui/swagger-ui/dist'
				}
			}
		}]);

		pack = newPack;

		callback(null, pack);
	});
}

/** Starts the Paie-API server pack.
* Initializes the server pack if needed.
*
*@param	{Function<error|null, Hapi.Pack>}	A callback that will be called once the server has been started.
*/
function start(callback) {
	if (pack)
		return _start(callback);

	init(function(error, pack) {
		if (error)
			return callback(error);

		_start(callback);
	});
}

/** Starts the Paie-API server pack, assuming it has already been initialized.
*
*@param	{Function<error|null, Hapi.Pack>}	A callback that will be called once the server has been started.
*@private
*/
function _start(callback) {
	pack.start(function(error) {
		callback(error, pack);
	});
}

/** Stops the Paie-API server.
*/
function stop(callback) {
	pack.stop(callback);
}


exports.start	= start;
exports.stop	= stop;
