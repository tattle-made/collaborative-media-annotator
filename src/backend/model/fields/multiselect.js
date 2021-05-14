const Joi = require("joi");

const Schema = Joi.object({
	label: Joi.string().min(5).max(25).required(),
	type: Joi.string().valid("multiselect").required(),
	parameters: Joi.object({
		options: Joi.array().items(Joi.string()),
	}),
});

/**
 *
 * USAGE :
 * const instance = await multiselect.InstanceFactory({
 *	label: "hello",
 *	parameters: {
 *		options: ["option a", "option b"],
 *	},
 *	});
 */
async function InstanceFactory({ label, parameters } = {}) {
	const obj = { label, type: "multiselect", parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for string form fields. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
