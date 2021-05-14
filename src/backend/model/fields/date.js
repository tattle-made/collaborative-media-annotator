const Joi = require("joi");

const Schema = Joi.object({
	label: Joi.string().min(5).max(25).required(),
	type: Joi.string().valid("date").required(),
});

/**
 * USAGE :
 * const instance = date.InstanceFactory({
 *	label: "Enter Date",
 * });
 */
async function InstanceFactory({ label, type } = {}) {
	const obj = { label, type: "date" };
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for date form fields. ${err.message}`;
	}
}

module.exports = { InstanceFactory, Schema };
