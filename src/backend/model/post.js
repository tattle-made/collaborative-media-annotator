const Joi = require("joi");
const { nanoid } = require("nanoid");

const Schema = Joi.object({
	id: Joi.string().min(1).max(50),
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
async function InstanceFactory({ id = `${nanoid()}`, type, url } = {}) {
	const obj = {
		id,
		type,
		url,
	};

	try {
		const validatedObj = await Schema.validateAsync(obj);
		return validatedObj;
	} catch (err) {
		throw `Error : Could not create Post object. Please check schema. ${err.message}`;
	}
}

module.exports = { InstanceFactory };
