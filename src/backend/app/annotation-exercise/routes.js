const { StatusCodes } = require("http-status-codes");
const {
	create: createExercise,
	getAll: getAllExercises,
	get: getExercise,
} = require("./controller");
const {
	createManyForExercise: createManyPostsForExercise,
} = require("../post/controller");

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

			const posts = await createManyPostsForExercise(
				post_urls,
				exerciseInstance.id
			);
			console.log({ POSTS: posts });
			// create posts in exercise and get ids
			// create participant set for this exercise
			// save schema in redis
			res.status(StatusCodes.OK).send("exercise");
		} catch (err) {
			console.log(`Error : Could not handle POST /exercise. ${err}`);
		}
	});

	expressApp.get("/exercises", async (req, res) => {
		try {
			const exercises = await getAllExercises();
			res.status(StatusCodes.OK).send({ exercises });
		} catch (err) {
			console.log(`Error : could not process GET /exercises. ${err}`);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	});

	expressApp.get("/exercise/:exercise_id", async (req, res) => {
		try {
			const { exercise_id } = req.params;
			const exercise = await getExercise(exercise_id);

			console.log({ exercise_id, exercise });
			res.status(StatusCodes.OK).send({ exercise });
		} catch (err) {
			console.log(`Error : could not process GET /exercise. ${err}`);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	});

	return expressApp;
};

module.exports = { configure };
