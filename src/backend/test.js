const formData = require("./model/form-data");

const test = async () => {
	try {
		const instance = await formData.InstanceFactory({
			date: "25/12/2020",
			time: "8 am",
			age: 12,
			name: "what?",
			options: "[a],[b],[c]",
		});
		console.log(instance);
	} catch (err) {
		console.log(err);
	}
};
test();
