const { expressApp, configure, start } = require("./core/express");
const {
	configure: configureHealthCheck,
} = require("./app/health-check/routes");
const config = require("config");

const PORT = config.get("express.port");

configure(expressApp);
configureHealthCheck(expressApp);

start(expressApp, PORT);
