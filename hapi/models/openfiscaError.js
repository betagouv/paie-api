function openFiscaError(options) {
	if (!options) {
		options = {};
	}

	this.openFiscaError = options.openFiscaError;
	this.openFiscaRequest = options.openFiscaRequest;
}

module.exports = openFiscaError;
