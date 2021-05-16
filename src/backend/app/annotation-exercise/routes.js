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
const { create: createSchema } = require("../form-schema/controller");
const { nanoid } = require("nanoid");
const { RedisUtils, redis } = require("../../core/redis");

const configure = (expressApp) => {
	expressApp.post("/exercise", async (req, res) => {
		try {
			const { name, description, post_urls, participants, schema } =
				req.body;
			// console.log(participants);
			const response = {};

			// console.log(schema);

			const exerciseInstance = await createExercise({
				name,
				description,
				participants,
			});
			// console.log({ EXERCISE: exerciseInstance });

			const posts = await createManyPostsForExercise(
				post_urls,
				exerciseInstance.id
			);
			exerciseInstance.posts = posts;
			const schemaId = nanoid();
			exerciseInstance.schema = schemaId;

			// console.log(participants);
			await addParticipants(participants, exerciseInstance.id);

			// console.log({ EXERCISEEEEE: exerciseInstance });

			// store schema in ReJSON
			const exerciseRes = await createSchema(
				exerciseInstance,
				`exerciseJSON:${exerciseInstance.id}`
			);
			const schemaRes = await createSchema(
				schema,
				`schema:${exerciseInstance.id}:${schemaId}`
			);

			// console.log({
			// 	SCHEMA_ID: schemaId,
			// 	SCHEMA: schema,
			// 	POSTS: posts,
			// 	EXERCISE: exerciseInstance,
			// });

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
		// console.log("HERE");
		try {
			const { exercise_id } = req.params;
			const exercise = await RedisUtils.getJSON(
				`exerciseJSON:${exercise_id}`
			);
			const schema = await RedisUtils.getJSON(
				`schema:${exercise_id}:${
					JSON.parse(exercise.toString()).schema
				}`
			);

			const posts = JSON.parse(exercise.toString()).posts;

			// console.log({ POSTS: posts });
			let postRes = [];
			posts.map(async (post) => {
				postRes.push(redis.hgetall(`post:${exercise_id}:${post}`));
			});

			const allPosts = await Promise.all(postRes);
			// console.log({ PPPPP: allPosts });

			// console.log({ exercise_id, exercise });
			res.status(StatusCodes.OK).send({
				exercise: JSON.parse(exercise.toString()),
				schema: JSON.parse(schema.toString()),
				posts: allPosts,
				exercise_id,
			});
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
