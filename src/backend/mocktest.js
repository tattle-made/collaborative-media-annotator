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

// const {MongoClient} = require('mongodb');

// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(global.__MONGO_URI__, {
//       useNewUrlParser: true,
//     });
//     db = await connection.db(global.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//     await db.close();
//   });

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);
//   });
// });
