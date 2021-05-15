const Joi = require("joi");
const Fields = require("./fields");

const Schema = Joi.object().pattern(
	Joi.string(),
	Joi.alternatives().try(
		Fields.number.Schema,
		Fields.text.Schema,
		Fields.date.Schema,
		Fields.singleselect.Schema,
		Fields.multiselect.Schema
	)
);

/**
 * USAGE :
 * const instance = await schema.InstanceFactory({
 *	field_a: await text.InstanceFactory({ label: "Your Name" }),
 *	field_b: await number.InstanceFactory({ label: "Your Age", parameters: { min: 18, max: 50 },}),
 *	field_c: await date.InstanceFactory({ label: "date of birth" }),
 *	field_d: await singleselect.InstanceFactory({ label: "choose one ",parameters: { name: "options", options: ["A", "B", "C"] },}),
 *	field_e: await multiselect.InstanceFactory({ label: "choose one ", parameters: { options: ["A", "B", "C"] } }),
 * });
 */
async function InstanceFactory(obj) {
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Form Schema Model. Please check schema. ${err.message}`;
	}
}

module.exports = { InstanceFactory };
