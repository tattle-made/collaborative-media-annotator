const user = require("./model/user");
const flat = require("flat");
const schema = require("./model/form-schema");
const {
	text,
	number,
	date,
	singleselect,
	multiselect,
} = require("./model/fields");
const flatten = require("flat");

const test = async () => {
	try {
		const schemaInstance = await schema.InstanceFactory({
			field_a: await text.InstanceFactory({ label: "Your Name" }),
			field_b: await number.InstanceFactory({
				label: "Your Age",
				parameters: { min: 18, max: 50 },
			}),
			field_c: await date.InstanceFactory({ label: "date of birth" }),
			field_d: await singleselect.InstanceFactory({
				label: "choose one ",
				parameters: { name: "options", options: ["A", "B", "C"] },
			}),
			field_e: await multiselect.InstanceFactory({
				label: "choose one ",
				parameters: { options: ["A", "B", "C"] },
			}),
		});
		console.log(schemaInstance);
		console.log(flatten({ schema: schemaInstance }, { delimiter: ":" }));
	} catch (err) {
		console.log(err);
	}
};
test();
