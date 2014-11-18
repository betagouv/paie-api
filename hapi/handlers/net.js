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
		if (! req.query.brut && ! req.query.imposable)
			return reply('You need to provide either "brut" or "imposable" parameters.').code(400);

		var response = reply().hold();

		var data = openFiscaMappings.calculateNet(req.query);

		client.post('calculate', data, { timeout: OPENFISCA_RESPONSE_TIMEOUT }, function(err, res, body) {
			if (err &&  err.code == 'ETIMEDOUT') {
				response.source = 'OpenFisca took more than ' + OPENFISCA_RESPONSE_TIMEOUT + 'ms to reply, aborted.';
				response.code(504);
			} else if (err) {
				response.source += err + "\n\nSent following request to OpenFisca:\n" + JSON.stringify(data);
				response.code(500);
			} else {
				response.source = JSON.stringify(body);
				response.code(res.statusCode);
			}

			response.send();
		});
	}
};
