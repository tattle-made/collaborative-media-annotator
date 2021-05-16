const { redis } = require("../../core/redis");
const annotationExercise = require("../../model/annotation-exercise");
const { nanoid } = require("nanoid");

async function create({ name, description, password } = {}) {
	try {
		const exercise = await annotationExercise.InstanceFactory({
			name,
			description,
			password,
		});
		await redis.hset(`exercise:${exercise.id}`, exercise);
		return exercise;
	} catch (err) {
		throw `Error Creating Exercise. ${err}`;
	}
}

async function getAll() {
	try {
		let response;
		const exercises = await redis.keys("exercise:*");

		const hgetallPromises = [];
		exercises.map(async (exercise) => {
			hgetallPromises.push(redis.hgetall(exercise));
		});

		response = await Promise.all(hgetallPromises);
		return response;
	} catch (err) {
		console.log(err);
		throw "Error : Could not fetch exercises from store";
	}
}

async function get(id) {
	try {
		const exercise = await redis.hgetall(`exercise:${id}`);
		return exercise;
	} catch (err) {
		throw `Could not fetch exercise ${{ id }}. ${err}`;
	}
}

// async function

module.exports = { create, getAll, get };
