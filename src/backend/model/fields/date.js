const Joi = require("joi");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().max(10).required(),
	label: Joi.string().min(5).max(25).required(),
	type: Joi.string().valid("date").required(),
});

/**
 * USAGE :
 * const instance = date.InstanceFactory({
 *	label: "Enter Date",
 * });
 */
async function InstanceFactory({ id = nanoid(), label, type } = {}) {
	const obj = { id, label, type: "date" };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Date object. Please check schema. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
