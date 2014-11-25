function validationError(options) {
	if (!options) {
		options = {};
	}

	this.statusCode = options.statusCode;
	this.error = options.error;
	this.message = options.message;
	this.validation = options.validation;
}

module.exports = validationError;
