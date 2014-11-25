function timeoutError(options) {
	if (!options) {
		options = {};
	}

	this.message = options.message;
	this.timeout = options.timeout;
}

module.exports = timeoutError;
