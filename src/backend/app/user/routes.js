const { StatusCodes } = require("http-status-codes");
const user = require("../../model/user");
const { redis } = require("../../core/redis");

const createUsers = async () => {
	users = [];
	for (i = 0; i < 10; i++) {
		let userInstance = await user.InstanceFactory();
		try {
			await user.save(userInstance);
		} catch (err) {
			console.log(err);
		}
		users.push(userInstance);
	}
	console.log(users);
};

// createUsers();

const configure = (expressApp) => {
	expressApp.get("/users", async (req, res) => {
		const userIds = await redis.keys("user:*");

		const pipeline = redis.pipeline();
		userIds.map((id) => {
			pipeline.hgetall(id);
		});
		try {
			const response = await pipeline.exec();
			const result = response.map((r, i) => {
				return { id: userIds[i], ...r[1] };
			});
			console.log(result);
			res.status(StatusCodes.OK).send(result);
		} catch (err) {
			console.log(err);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
				error: err.message,
			});
		}
	});

	return expressApp;
};

module.exports = { configure };
