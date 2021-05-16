function configure(io) {
	io.on("connection", (socket) => {
		console.log("a user connected");
		socket.on("disconnect", () => {
			console.log("user disconnected");
		});

		socket.on("data", (msg) => {
			console.log("message : ", msg);
		});

		socket.on("exit", (msg) => {
			console.log("user exit");
		});
	});
}

module.exports = { configure };
