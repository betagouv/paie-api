var fs		= require('fs');

var Yaml	= require('js-yaml');


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
			api			: Yaml.safeLoad(fs.readFileSync('./swagger.yaml')),
			handlers	: __dirname + '/hapi/handlers',
			docspath	: '/'
		}
	}
};

module.exports = MANIFEST;
