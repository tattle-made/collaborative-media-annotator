const Joi = require("joi");

const Schema = Joi.object({});

function InstanceFactory({} = {}) {
	const obj = {};
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for number form fields. ${err.message}`;
	}
}

export { InstanceFactory };
