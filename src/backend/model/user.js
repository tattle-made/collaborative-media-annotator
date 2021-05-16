const Joi = require("joi");
const {
	uniqueNamesGenerator,
	names,
	colors,
} = require("unique-names-generator");
const randomColor = require("randomcolor");
const { redis } = require("../core/redis");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().min(1).max(50),
	name: Joi.string().min(3).max(25),
	avatar_color: Joi.string().regex(/^#[A-Fa-f0-9]{6}$/),
});

/**
 *
 * name and avatar_color are optional parameters.
 * USAGE :
 * 	user.InstanceFactory();
 * 	user.InstanceFactory({avatar_color: "#6483f4"});
 */
async function InstanceFactory({
	id = `${nanoid()}`,
	name = uniqueNamesGenerator({
		dictionaries: [colors, names],
		separator: " ",
		style: "lowerCase",
	}),
	avatar_color = randomColor({ hue: "blue" }),
} = {}) {
	const obj = { id, name, avatar_color };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create User. Please check the schema in docs. ${err.message}`;
	}
}

async function save(user) {
	try {
		const result = await redis.hset(`user:${user.id}`, user);
	} catch (err) {
		throw `Could not save user in Redis ${user}. ${err}`;
	}
}

module.exports = { InstanceFactory, save };
