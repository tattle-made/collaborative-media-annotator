const { redis } = require("./redis");

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

		socket.on("join", async (msg) => {
			console.log("user joined ", msg);
			try {
				await redis.sadd(
					`participant-ol:${msg.exerciseId}:${msg.postId}`,
					msg.name
				);
			} catch (err) {
				console.log(`Error : could not add participant. ${err}`);
			}

			const onlineParticipants = await redis.smembers(
				`participant-ol:${msg.exerciseId}:${msg.postId}`
			);
			console.log({ onlineParticipants });
			socket.broadcast.emit("join", onlineParticipants);
		});
	});
}

module.exports = { configure };
