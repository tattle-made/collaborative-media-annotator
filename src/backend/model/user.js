const Joi = require("joi");
const {
	uniqueNamesGenerator,
	names,
	colors,
} = require("unique-names-generator");

const Schema = Joi.object({
	name: Joi.string().min(3).max(25),
});

/**
 *
 * Leaving the parameter name as empty generates a random username
 */
async function InstanceFactory({
	name = uniqueNamesGenerator({
		dictionaries: [colors, names],
		separator: " ",
		style: "lowerCase",
	}),
	parameters = {},
} = {}) {
	const obj = { name, parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for string form fields. ${err.message}`;
	}
}
