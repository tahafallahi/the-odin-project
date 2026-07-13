class DataBaseError extends Error {
	constructor(message) {
		super(message);
		this.name = "DataBaseError"
	}
}

module.exports = { DataBaseError }