const Redis = require("ioredis");
const redis = new Redis();

Redis.Command.setArgumentTransformer("hset", (args) => {
	console.log(args);
	let arg = args[1];
	let argumentArray = [];
	argumentArray.push(args[0]);
	Object.keys(arg).map((item) => {
		argumentArray.push(item);
		argumentArray.push(arg[item] + "");
	});

	return argumentArray;
});

module.exports = { redis };

// const test = async () => {
// 	const annotationObject = {
// 		name: "denny",
// 		age: 20,
// 	};
// 	await redis.hset("annotation", annotationObject);
// 	const val = await redis.hgetall("annotation");
// 	const name = await redis.hget("annotation", "name");
// 	await redis.hset("annotation", { age: 22 });
// 	// console.log(name);
// };
// test();
