const controller = require("./controller");

const test = async () => {
	try {
		await controller.create({ description: "Yeh hain event badhiya wala" });
	} catch (err) {
		console.log(err);
	}
};

test();
