const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const expressApp = express();

const configure = (expressApp) => {
	expressApp.use(
		cors({
			origin: "*",
		})
	);

	expressApp.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});
	// expressApp.use(bodyParser.urlencoded());
	// expressApp.use(express.json);
	// expressApp.use(authenticationMiddleware);

	expressApp.use(bodyParser.json());
	return expressApp;
};

const start = (expressApp, port) => {
	return expressApp.listen(port, () => {
		console.log(`Server Listening on ${port}`);
	});
};

module.exports = { expressApp, configure, start };
