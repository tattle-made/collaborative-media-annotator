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
		await redis.hset(`${exercise.id}`, exercise);
		return { exercise };
	} catch (err) {
		throw `Error Creating Exercise. ${err}`;
	}
}

// async function

module.exports = { create };
