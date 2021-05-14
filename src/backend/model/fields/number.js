const Joi = require("joi");

// todo ensure max is greater than min
const Schema = Joi.object({
	label: Joi.string().min(5).max(25).required(),
	type: Joi.string().valid("number").required(),
	parameters: Joi.object({
		min: Joi.number(),
		max: Joi.number(),
	}),
}).options({ stripUnknown: true });

async function InstanceFactory({ label, parameters = {} } = {}) {
	const obj = { label, type: "number", parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for number form fields. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
