const { StatusCodes } = require("http-status-codes");

const configure = (expressApp) => {
	expressApp.get("/health-check", (req, res) => {
		res.status(StatusCodes.OK).send("alive");
	});

	return expressApp;
};

module.exports = { configure };
