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
		const id = nanoid();
		await redis.hset(`exercise:${id}`, exercise);
		return { id };
	} catch (err) {
		throw `Error Creating Exercise. ${err.message}`;
	}
}

// async function

module.exports = { create };
