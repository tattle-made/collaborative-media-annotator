// const controller = require("./controller");
// await controller.create({ description: "Yeh hain event badhiya wala" });
import {
	create,
	getAll,
	get,
	addParticipants,
	getParticipants,
} from "./controller";

test("create a user in redis", async () => {
	const exercise = await create({
		name: "test name",
		description: "test description",
	});
	console.log(exercise);
	expect(exercise.name).toBe("test name");
});
