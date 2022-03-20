import { assert } from "chai";

import faker from "faker";

import { createConnection, Connection, Repository } from "typeorm";

import { Profile, User } from "../src/entity";

import { chance } from "./fixtures";

describe("one-to-one", () => {
  let connection: Connection;
  let profileRepository: Repository<Profile>;
  let userRepository: Repository<User>;

  before(async function () {
    connection = await createConnection();
    profileRepository = connection.getRepository(Profile);
    userRepository = connection.getRepository(User);
  });

  after(async function () {
    await connection.close();
  });

  it("repository create", async () => {
    const profileBase = profileRepository.create({
      name: faker.animal.fish(),
    });
    const profile = await profileRepository.save(profileBase);
    console.log(profile);
    const userBase = userRepository.create({
      email: chance.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profile,
      password: "123",
    });
    const user = await userRepository.save(userBase);
    console.log(user);

    const userFound = await userRepository.findOne({
      where: { id: user.id },
      relations: ["profile"],
    });
    console.log(userFound);
  });

  it("repository eager loading, user", async () => {
    const results = await userRepository.find({
      relations: ["profile"],
    });
    console.log(results);
  });

  it("repository eager loading, profile", async () => {
    const results = await profileRepository.find({
      relations: ["user"],
    });
    console.log(results);
  });
});
