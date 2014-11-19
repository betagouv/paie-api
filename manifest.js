/** Will be consumed by Hapi.Pack.compose.
*
*@see	http://hapijs.com/api#packcomposemanifest-options-callback
*/
var MANIFEST = {
	servers: [ {
		port: process.env.npm_package_config_port
	} ],
	plugins: {
		'swaggerize-hapi': {
			api			: require('./swagger.json'),
			handlers	: './hapi/handlers',
			docspath	: '/'
		}
	}
};

module.exports = MANIFEST;
