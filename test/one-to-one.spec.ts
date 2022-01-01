import { assert } from "chai";
import app from "../src/app.es6";
import supertest from "supertest";

import faker from "faker";

import { createConnection, Connection, Repository } from "typeorm";

import { Profile, User } from "../src/entity";

describe("one-to-one", () => {
  let connection: Connection;
  let profileRepository: Repository<Profile>;
  let userRepository: Repository<User>;

  before(async () => {
    connection = await createConnection();
    profileRepository = connection.getRepository(Profile);
    userRepository = connection.getRepository(User);
  });

  after(async () => {
    await connection.close();
  });

  it("repository create", async () => {
    const profileBase = profileRepository.create({
      name: faker.animal.fish(),
    });
    const profile = await profileRepository.save(profileBase);
    console.log(profile);
    const userBase = userRepository.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profile,
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
    const userFound = await userRepository.find({
      relations: ["profile"],
    });
    console.log(userFound);
  });
});
