var request = require('request-json');

var openFiscaMappings	= require('../../openFiscaMappings'),
	validationError		= require('../models/validationError.js');


var client = request.newClient('http://api.openfisca.fr/api/1/');

var OPENFISCA_RESPONSE_TIMEOUT = 10 * 1000;


/**
 * Operations on /fillon
 */
module.exports = {
	/**
	 *
	 * parameters: brut, categorie, taille
	 * produces: application/json
	 */
	get: function calculateFillon(req, reply) {
		var data = openFiscaMappings.calculateFillon(req.query);

		client.post('calculate', data, { timeout: OPENFISCA_RESPONSE_TIMEOUT }, function(err, res, body) {
			var output	= {},
				code	= res.statusCode;

			if (err && err.code == 'ETIMEDOUT') {
				output.message = 'OpenFisca took more than ' + OPENFISCA_RESPONSE_TIMEOUT + 'ms to reply, aborted.';
				output.timeout = OPENFISCA_RESPONSE_TIMEOUT;
				code = 504;
			} else if (err) {
				output.openFiscaError = err;
				output.openFiscaRequest = data;
				code = 502;
			} else {
				output = openFiscaMappings.extractFillon(body);
			}

			reply(output).code(code);
		});
	}
}
