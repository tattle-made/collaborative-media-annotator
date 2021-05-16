const express = require("express");
const expressApp = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

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

const server = http.createServer(expressApp);
const { Server } = require("socket.io");
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

const configure = (expressApp) => {
	return expressApp;
};

const start = (port) => {
	return server.listen(port, () => {
		console.log(`Server Listening on ${port}`);
	});
};

module.exports = { expressApp, io, configure, start };
