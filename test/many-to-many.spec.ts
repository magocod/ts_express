import { assert } from "chai";

import faker from "faker";

import { createConnection, Connection, Repository } from "typeorm";

import { Category, Question, Role, Permission, User } from "../src/entity";

import { generateUser } from "./fixtures";

describe("many-to-many", () => {
  let connection: Connection;

  let categoryRepository: Repository<Category>;
  let questionRepository: Repository<Question>;

  let roleRepository: Repository<Role>;
  let permissionRepository: Repository<Permission>;
  let userRepository: Repository<User>;

  before(async () => {
    connection = await createConnection();

    categoryRepository = connection.getRepository(Category);
    questionRepository = connection.getRepository(Question);

    roleRepository = connection.getRepository(Role);
    permissionRepository = connection.getRepository(Permission);
    userRepository = connection.getRepository(User);
  });

  after(async () => {
    await connection.close();
  });

  describe("Category_Question", function () {
    it("repository create", async () => {
      const categoryBaseA = categoryRepository.create({
        name: faker.animal.dog(),
      });
      const categoryA = await categoryRepository.save(categoryBaseA);
      console.log(categoryA);

      const questionA = await questionRepository.save(
        questionRepository.create({
          title: faker.datatype.uuid(),
          text: faker.datatype.uuid(),
          categories: [categoryA],
        })
      );
      console.log(questionA);

      const categoryB = await categoryRepository.save(
        categoryRepository.create({
          name: faker.animal.dog(),
        })
      );

      let questionB = await questionRepository.save(
        questionRepository.create({
          title: faker.datatype.uuid(),
          text: faker.datatype.uuid(),
          categories: [categoryA],
        })
      );

      questionB.categories.push(categoryB);
      questionB = await questionRepository.save(questionB);
      // console.log(questionB);
    });

    it("repository eager loading, categories", async () => {
      const results = await questionRepository.find({
        relations: ["categories"],
      });
      console.log(results);
    });

    it("repository eager loading, questions", async () => {
      const results = await categoryRepository.find({
        relations: ["questions"],
      });
      console.log(results);
    });
  });

  describe("Role_Permission_User", function () {
    it("repository create", async function () {
      const roleBaseA = roleRepository.create({
        name: faker.animal.dog(),
      });
      const roleA = await roleRepository.save(roleBaseA);
      console.log(roleA);

      const permissionA = await permissionRepository.save(
        permissionRepository.create({
          name: faker.datatype.uuid(),
          roles: [roleA],
        })
      );
      console.log(permissionA);

      const roleB = await roleRepository.save(
        categoryRepository.create({
          name: faker.animal.dog(),
        })
      );

      let permissionB = await permissionRepository.save(
        permissionRepository.create({
          name: faker.datatype.uuid(),
          roles: [roleA],
        })
      );

      permissionB.roles.push(roleB);
      permissionB = await permissionRepository.save(permissionB);

      const { user } = await generateUser(connection);
      user.roles = [roleA];
      await userRepository.save(user);

      const payload = await generateUser(connection, { roles: [roleB] });
      payload.user.roles.push(roleA);
      await userRepository.save(payload.user);

      // console.log(questionB);
    });

    it("repository eager loading, permission.roles", async function () {
      const results = await permissionRepository.find({
        relations: ["roles"],
      });
      console.log(results);
    });

    it("repository eager loading, role.permission", async function () {
      const results = await roleRepository.find({
        relations: ["permissions"],
      });
      console.log(results);
    });

    it("repository eager loading, user.roles", async function () {
      const results = await userRepository.find({
        relations: ["roles"],
      });
      console.log(results);
    });
  });
});
