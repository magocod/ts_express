import { assert } from "chai";

import faker from "faker";
import { User, Address } from "../src/models";

describe("example_one_to_many", () => {
  it("simple create relationship", async () => {
    const user = await User.create({
      name: faker.datatype.uuid(),
    });
    // console.log(user.toJSON());

    // simple create
    const address = await Address.create({
      name: "model-" + faker.datatype.uuid(),
      userId: user.id,
    });
    // console.log(project.toJSON());

    const result = await User.findByPk(user.id, {
      include: [
        {
          model: Address,
          // as: 'Roles'
        },
      ],
      rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
    });
    // console.log(result.toJSON());
    console.log(JSON.stringify(result, null, 2));
  });

  // it("model method create relationship", async () => {
  //   const user = await User.create({
  //     name: faker.datatype.uuid(),
  //   });
  //   // console.log(user.toJSON());
  //   // relation create
  //   const addressB = await user.createAddress({
  //     name: "user-relation-" + faker.datatype.uuid(),
  //     // userId: user.id,
  //   });
  //   // console.log(projectB.toJSON());
  //
  //   const result = await User.findByPk(user.id, {
  //     include: [
  //       {
  //         model: Address,
  //         // as: 'Roles'
  //       },
  //     ],
  //     rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  //   });
  //   // console.log(result.toJSON());
  //   console.log(JSON.stringify(result, null, 2));
  // });

  it("get relationship, belongsTo", async () => {
    const addresses = await Address.findAll({ include: User });
    console.log(JSON.stringify(addresses, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, hasOne", async () => {
    const users = await User.findAll({
      include: [
        {
          model: Address, // will create a left join
        },
      ],
    });
    console.log(JSON.stringify(users, null, 2));
    // assert.equal(typeof user.id, 'number');
  });
});
