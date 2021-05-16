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

async function saveJSON(schemaJson, key) {
	try {
		const command = await redis.sendCommand(
			new Redis.Command(
				"JSON.SET",
				[key, ".", JSON.stringify(schemaJson)],
				"utf-8",
				function (err, value) {
					if (err) throw err;
					console.log({ SET: value.toJSON() });
					return value;
				}
			)
		);
		return command;
	} catch (err) {
		throw `Could not save schema in store. ${err}`;
	}
}

async function getJSON(key) {
	try {
		const command = await redis.sendCommand(
			new Redis.Command("JSON.GET", [key], "utf-8", function (
				err,
				value
			) {
				if (err) throw err;
				return value;
			})
		);
		return command;
	} catch (err) {
		throw `Could not get schema in store. ${err}`;
	}
}

const RedisUtils = {
	saveJSON,
	getJSON,
};

module.exports = { redis, RedisUtils };

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
