const Joi = require("joi");
const generator = require("generate-password");
const {
	uniqueNamesGenerator,
	names,
	colors,
} = require("unique-names-generator");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().min(1).max(50),
	name: Joi.string().required(),
	description: Joi.string().min(0).max(140),
	password: Joi.string().required(),
	schema: Joi.number(),
	owner: Joi.number(),
	editors: Joi.array().items(Joi.number()),
	participants: Joi.array().items(Joi.string()),
	posts: Joi.array().items(Joi.number()),
});

/* Returns an instance or throws an error
 *
 * USAGE :
 * instance = InstanceFactory();
 * instance = InstanceFactory({name = "blue rohan"})
 * instance = InstanceFactory({name = "blue rohan", participants = 12}) // throws error "participants" must be an array
 */
async function InstanceFactory({
	id = `${nanoid()}`,
	name = uniqueNamesGenerator({
		dictionaries: [colors, names],
		separator: " ",
		style: "lowerCase",
	}),
	description = "write something here",
	password = generator.generate({ length: 16, numbers: true }),
	schema = -1,
	owner = -1,
	editors = [],
	participants = [],
	posts = [],
} = {}) {
	const obj = {
		id,
		name,
		description,
		password,
		owner,
		schema,
		editors,
		participants,
		posts,
	};

	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Exercise object. Please check Schema. ${err.message}`;
	}
}

module.exports = { InstanceFactory };
