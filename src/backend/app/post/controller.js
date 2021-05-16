const { redis } = require("../../core/redis");
const postModel = require("../../model/post");

async function createManyForExercise(urls, exerciseId) {
	const posts = [];
	const pipeline = redis.pipeline();

	urls.map(async (url) => {
		let instance = await postModel.InstanceFactory({ type: "image", url });
		posts.push(instance);

		try {
			// const result = await pipeline.exec();
			redis.hset(`post:${exerciseId}:${instance.id}`, instance);
			// console.log(`Success : created posts in redis`);
			// console.log(result);
		} catch (err) {
			throw `Error : Could not save posts in redis ${err}`;
		}
	});
	return posts;
}

async function getAll() {}

async function get(exerciseId, postId) {
	try {
		const post = await redis.hgetall(`post:${exerciseId}:${postId}`);
		return post;
	} catch (err) {
		throw "Coult not get post from redis";
	}
}

module.exports = { createManyForExercise, getAll, get };
