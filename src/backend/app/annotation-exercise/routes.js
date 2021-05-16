const { StatusCodes } = require("http-status-codes");
const {
	create: createExercise,
	getAll: getAllExercises,
	get: getExercise,
	addParticipants,
	getParticipants,
} = require("./controller");
const {
	createManyForExercise: createManyPostsForExercise,
} = require("../post/controller");

const configure = (expressApp) => {
	expressApp.post("/exercise", async (req, res) => {
		try {
			const { name, description, post_urls, participants, schema } =
				req.body;
			console.log(participants);
			const response = {};

			const exerciseInstance = await createExercise({
				name,
				description,
				participants,
			});
			console.log({ EXERCISE: exerciseInstance });

			const posts = await createManyPostsForExercise(
				post_urls,
				exerciseInstance.id
			);
			exerciseInstance.posts = posts;

			console.log(participants);
			await addParticipants(participants, "test_id");

			console.log({ EXERCISEEEEE: exerciseInstance });

			// save schema in redis
			res.status(StatusCodes.OK).send(response);
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

	expressApp.get("/exercise/:exercise_id/participants", async (req, res) => {
		try {
			const { exercise_id } = req.params;
			const participants = await getParticipants(exercise_id);
			res.status(StatusCodes.OK).send({ participants });
		} catch (err) {
			console.log(`Error : could not fetch participants. ${err}`);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	});

	return expressApp;
};

module.exports = { configure };
