const Joi = require("joi");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().max(10).required(),
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
async function InstanceFactory({ id = nanoid(), label, parameters = {} } = {}) {
	const obj = { id, label, type: "singleselect", parameters };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Singleselect model. Please check schema. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
