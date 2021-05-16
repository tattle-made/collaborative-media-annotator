const { expressApp, configure, start } = require("./core/express");
const {
	configure: configureHealthCheck,
} = require("./app/health-check/routes");
const { configure: configureUsers } = require("./app/user/routes");
const {
	configure: configureExercise,
} = require("./app/annotation-exercise/routes");
const { configure: configurePost } = require("./app/post/routes");
const config = require("config");

const PORT = config.get("express.port");

configure(expressApp);
configureHealthCheck(expressApp);
configureUsers(expressApp);
configureExercise(expressApp);
configurePost(expressApp);

start(expressApp, PORT);
