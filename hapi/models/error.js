function error(options) {
	if (!options) {
		options = {};
	}

	this.message = options.message;
}

module.exports = error;
