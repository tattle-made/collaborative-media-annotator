const Joi = require("joi");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().max(10).required(),
	label: Joi.string().min(5).max(25).required(),
	type: Joi.string().valid("string").required(),
	parameters: Joi.object({
		length: Joi.number(),
		lines: Joi.number(),
	}),
}).options({ stripUnknown: true });

/*
 * USAGE :
 * const instance = InstanceFactory({
 *	label: "Please enter a number",
 *	parameters: { length: 250 },
 * });
 */

async function InstanceFactory({ id = nanoid(), label, parameters = {} } = {}) {
	const obj = { id, label, type: "string", parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for string form fields. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
