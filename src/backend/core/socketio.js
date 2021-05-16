function configure(io) {
	io.on("connection", (socket) => {
		console.log("a user connected");
		socket.on("disconnect", () => {
			console.log("user disconnected");
		});

		socket.on("data", (msg) => {
			console.log("message : ", msg);
			socket.broadcast.emit("data", msg);
		});

		socket.on("exit", (msg) => {
			console.log("user exit");
		});

		socket.on("join", (msg) => {
			console.log("user joined ", msg);
		});
	});
}

module.exports = { configure };
