const flatten = require("flatten");
const schema = require("../../model/form-schema");
const {
	text,
	number,
	date,
	singleselect,
	multiselect,
} = require("./model/fields");

async function create({ schemaJson }) {
	console.log(schema);
	// create a schema instance with schemaJson
	// validated it
	// flatten it
	// save it
	console.log(flatten({ schema }, { delimiter: ":" }));
}
