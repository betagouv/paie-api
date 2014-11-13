var request = require('request-json');

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
		var response = reply().hold();

		var data = {"scenarios":[{"test_case":{"familles":[{"parents":["ind0"]}],"foyers_fiscaux":[{"declarants":["ind0"]}],"individus":[{"activite":"Actif occupé","id":"ind0","sali":{"2014-10":1444},"type_sal":"prive_cadre"}],"menages":[{"personne_de_reference":"ind0"}]},"legislation_url":"http://api.openfisca.fr/api/1/default-legislation","period":"month:2014-10"}],"variables":["salbrut","sali","salnet","sal_h_b"]};

		client.post('calculate', data, { timeout: OPENFISCA_RESPONSE_TIMEOUT }, function(err, res, body) {
			if (err &&  err.code == 'ETIMEDOUT') {
				response.source = 'OpenFisca took more than ' + OPENFISCA_RESPONSE_TIMEOUT + 'ms to reply, aborted.';
				response.code(504);
			} else if (err) {
				response.source = '' + err;
				response.code(500);
			} else {
				response.source = JSON.stringify(body);
				response.code(res.statusCode);
			}

			response.send();
		});
	}
};
