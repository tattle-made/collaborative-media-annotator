const { StatusCodes } = require("http-status-codes");
const { getAll: getAllPosts, get: getPost } = require("./controller");

const configure = (expressApp) => {
	expressApp.get("/exercise/:exercise_id/post/:post_id", async (req, res) => {
		try {
			const { exercise_id, post_id } = req.params;

			const post = await getPost(exercise_id, post_id);
			res.status(StatusCodes.OK).send({ post });
		} catch (err) {
			console.log(`Error : could not process GET /exercises. ${err}`);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	});

	return expressApp;
};

module.exports = { configure };
