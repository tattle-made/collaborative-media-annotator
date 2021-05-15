const user = require("../../model/user");

async function create() {
	return await user.InstanceFactory();
}

module.exports = { create };
