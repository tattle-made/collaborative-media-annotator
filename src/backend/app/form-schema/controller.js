const Redis = require("ioredis");
const { RedisUtils } = require("../../core/redis");

async function create(schemaJson, key) {
	// create a schema instance with schemaJson
	// validated it
	// flatten it
	// save it
	return RedisUtils.saveJSON(schemaJson, key);
}

module.exports = { create };
