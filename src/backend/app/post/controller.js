const { redis } = require("../../core/redis");
const postModel = require("../../model/post");

async function createMany(urls) {
	const posts = [];
	const pipeline = redis.pipeline();

	console.log("==========");
	console.log(urls);
	console.log("===========");

	urls.map(async (url) => {
		let instance = await postModel.InstanceFactory({ type: "image", url });
		posts.push(instance);

		pipeline.hset(`${instance.id}`, instance);
	});
	try {
		const result = await pipeline.exec();
		console.log(`Success : created posts in redis`);
		return posts;
	} catch (err) {
		throw `Error : Could not save posts in redis`;
	}
}

module.exports = { createMany };
