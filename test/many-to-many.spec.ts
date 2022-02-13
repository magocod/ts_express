import { assert } from "chai";

import faker from "faker";
import { User, Profile } from "../src/models";

describe("example_many_to_many", function () {
  it("create relationship", async () => {
    const user = await User.create({ name: faker.datatype.uuid() });
    // console.log(user.toJSON())
    const profile = await Profile.create({ name: faker.animal.fish() });
    const profileB = await Profile.create({ name: faker.animal.dog() });
    // console.log(profile.toJSON())
    await user.addProfile(profile, { through: { selfGranted: false } });
    await user.addProfile(profileB, { through: { selfGranted: false } });
    const result = await User.findOne({
      where: { name: user.name },
      include: Profile,
    });
    // console.log(result.toJSON());
    console.log(JSON.stringify(result, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("create relationship, version 2", async () => {
    const user = await User.create({ name: faker.datatype.uuid() });
    const userB = await User.create({ name: faker.datatype.uuid() });
    // console.log(user.toJSON())
    const profile = await Profile.create({ name: faker.animal.fish() });
    // console.log(profile.toJSON())
    await profile.addUser(user, { through: { selfGranted: false } });
    await profile.addUser(userB, { through: { selfGranted: false } });
    const result = await Profile.findOne({
      where: { name: profile.name },
      include: User,
    });
    // console.log(result.toJSON());
    console.log(JSON.stringify(result, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, belongsToMany left", async () => {
    const profiles = await Profile.findAll({ include: User });
    console.log(JSON.stringify(profiles, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, belongsToMany right", async () => {
    const users = await User.findAll({
      include: [
        {
          model: Profile, // will create a left join
        },
      ],
    });
    console.log(JSON.stringify(users, null, 2));
    // assert.equal(typeof user.id, 'number');
  });
});
