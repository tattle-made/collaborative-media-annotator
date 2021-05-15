const { StatusCodes } = require("http-status-codes");
const { create: createExercise } = require("./controller");
const { createMany: createManyPosts } = require("../post/controller");

const configure = (expressApp) => {
	expressApp.post("/exercise", async (req, res) => {
		try {
			// console.log(req.body);

			const { name, description, post_urls, participants, schema } =
				req.body;

			// create an exercise in redis (name, description)
			const exerciseInstance = await createExercise({
				name,
				description,
			});
			console.log({ EXERCISE: exerciseInstance });

			const posts = await createManyPosts(post_urls);
			console.log({ POSTS: posts });
			// create posts in exercise and get ids
			// create participant set for this exercise
			// save schema in redis
			res.status(StatusCodes.OK).send("exercise");
		} catch (err) {
			console.log(`Error : Could not handle POST /exercise. ${err}`);
		}
	});

	return expressApp;
};

module.exports = { configure };
