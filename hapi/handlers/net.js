var request = require('request-json');

var openFiscaMappings = require('../../openFiscaMappings');


var client = request.newClient('http://api.openfisca.fr/api/1/');

var OPENFISCA_RESPONSE_TIMEOUT = 10 * 1000;

/** Operations on /net
 */
module.exports = {
	/**
	 *
	 * parameters: brut, imposable
	 * produces: application/json
	 */
	get: function calculateNet(req, reply) {
		if (! req.query.brut && ! req.query.imposable) {
			var output = {
				message: 'You need to provide either "brut" or "imposable" parameters.'
			}

			return reply(JSON.stringify(output)).code(400);
		}

		if (req.query.brut && req.query.imposable) {
			var output = {
				message: 'You need to provide only one of "brut" and "imposable" parameters.'
			}

			return reply(JSON.stringify(output)).code(409);
		}

		var response = reply().hold();

		var data = openFiscaMappings.calculateNet(req.query);

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
				output = openFiscaMappings.extractNet(body);
			}


			response.source = JSON.stringify(output);
			response.code(code);
			response.send();
		});
	}
};
