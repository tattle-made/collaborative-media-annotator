const user = require("../model/user");
const { redis } = require("../core/redis");

const createUsers = async () => {
	users = [];
	for (i = 0; i < 10; i++) {
		let userInstance = await user.InstanceFactory();
		try {
			await user.save(userInstance);
		} catch (err) {
			console.log(`Error : could not create users. ${err}`);
		}
		users.push(userInstance);
	}
	console.log(users);
};

createUsers();
