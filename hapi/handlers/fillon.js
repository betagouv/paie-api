var request = require('request-json');

var openFiscaMappings	= require('../../openFiscaMappings'),
	validationError		= require('../models/validationError.js');


var client = request.newClient('http://api.openfisca.fr/api/1/');

var OPENFISCA_RESPONSE_TIMEOUT = 10 * 1000;


/**
 * Operations on /fillon
 */

/** Until https://github.com/krakenjs/swaggerize-hapi/issues/17 is fixed, we have to validate required parameters here. This should be automatic.
*
*@param	{Object}	params	The hash of all query parameters.
*@returns	{ValidationError?}	A validationError if a required parameter is missing, or `undefined` if all are present.
*/
function createValidationErrorManuallyUntilExternalLibIsFixed(params) {
	var missing = [];

	[ 'brut', 'categorie', 'taille' ].forEach(function(requiredParameter) {
		if (params[requiredParameter] === undefined)
			missing.push(requiredParameter);
	});

	if (missing.length) {
		return new validationError({
			statusCode	: 400,
			error		: 'Missing ' + missing.join(', ') + ' required parameters',
			message		: 'The ' + missing.join(' and ') + ' parameters are required for this action.',
			validation	: {
				source	: 'query',
				keys	: missing
			}
		});
	}
}

module.exports = {
	/**
	 *
	 * parameters: brut, categorie, taille
	 * produces: application/json
	 */
	get: function calculateFillon(req, reply) {
		var data = openFiscaMappings.calculateFillon(req.query),
			error = null;

		if (error = createValidationErrorManuallyUntilExternalLibIsFixed(req.query))
			return reply(error).code(400);

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
