const Joi = require("joi");

const Schema = Joi.object({
	type: Joi.any().allow("text", "audio", "image", "video").required(),
	url: Joi.string().uri().required(),
});

/*
 * USAGE  :
 * const post = InstanceFactory({
 *	 type: "image",
 *	 url: "https://www.google.com/search",
 * });
 */
async function InstanceFactory({ type, url } = {}) {
	const post = {
		type,
		url,
	};

	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create object. Please check the schema for number form fields. ${err.message}`;
	}
}

module.exports = { InstanceFactory };
