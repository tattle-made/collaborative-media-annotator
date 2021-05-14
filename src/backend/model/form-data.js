const Joi = require("joi");
const Fields = require("./fields");

/**
 * This validates object with any number of keys and values
 * provided that the values are string
 *
 */
const Schema = Joi.object().pattern(Joi.string(), Joi.string());

/**
 * USAGE
 * const instance = await formData.InstanceFactory({
			date: "25/12/2020",
			time: "8 am",
			age: 12,
			name: "what?",
			options: "[a],[b],[c]",
		});
 */
async function InstanceFactory(obj) {
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for Schema's model. ${err.message}`;
	}
}

module.exports = { InstanceFactory };
