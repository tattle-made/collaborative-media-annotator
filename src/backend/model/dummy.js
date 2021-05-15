const Joi = require("joi");

const Schema = Joi.object({});

function InstanceFactory({} = {}) {
	const obj = {};
	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Dummy object. Please check schema. ${err.message}`;
	}
}

export { InstanceFactory };
