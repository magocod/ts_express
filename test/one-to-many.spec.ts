import { assert } from "chai";

import faker from "faker";
import { User, Project } from "../src/models";

describe("example_one_to_many", () => {
  it("create relationship", async () => {
    const user = await User.create({
      name: faker.datatype.uuid(),
    });
    // console.log(user.toJSON());

    // simple create
    const project = await Project.create({
      name: "model-" + faker.datatype.uuid(),
      userId: user.id,
    });
    // console.log(project.toJSON());

    // relation create
    const projectB = await user.createProject({
      name: "user-relation-" + faker.datatype.uuid(),
      // userId: user.id,
    });
    // console.log(projectB.toJSON());

    const result = await User.findByPk(user.id, {
      include: [
        {
          model: Project,
          // as: 'Roles'
        },
      ],
      rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
    });
    // console.log(result.toJSON());
    console.log(JSON.stringify(result, null, 2));
  });

  it("get relationship, belongsTo", async () => {
    const tasks = await Project.findAll({ include: User });
    console.log(JSON.stringify(tasks, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, hasMany", async () => {
    const users = await User.findAll({
      include: [
        {
          model: Project, // will create a left join
        },
      ],
    });
    console.log(JSON.stringify(users, null, 2));
    // assert.equal(typeof user.id, 'number');
  });
});
