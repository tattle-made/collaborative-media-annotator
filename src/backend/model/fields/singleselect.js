const Joi = require("joi");

const Schema = Joi.object({
	label: Joi.string().min(5).max(25).required(),
	type: Joi.string().valid("singleselect").required(),
	parameters: Joi.object({
		name: Joi.string().required(),
		options: Joi.array().items(Joi.string()).required(),
	}),
}).options({ stripUnknown: true });

/*
 * USAGE :
 * const instance = await singleselect.InstanceFactory({
 *			label: "hello",
 *			parameters: {
 *				name: "option-name",
 *				options: ["option a", "option b"],
 *			},
 *		});
 */
async function InstanceFactory({ label, parameters = {} } = {}) {
	const obj = { label, type: "singleselect", parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for string form fields. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };