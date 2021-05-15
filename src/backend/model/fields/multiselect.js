const Joi = require("joi");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().max(10).required(),
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

async function InstanceFactory({ id = nanoid(), label, parameters } = {}) {
	const obj = { id, label, type: "multiselect", parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Multiselect object. Please check schema. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
