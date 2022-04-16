import { assert } from "chai";

import { faker } from "@faker-js/faker";

import { DataSource, Repository } from "typeorm";

import { AppDataSource } from "../src/data-source"

import { Profile, User } from "../src/entity";

import { chance } from "./fixtures";

describe("one-to-one", () => {
  let ds: DataSource;
  let profileRepository: Repository<Profile>;
  let userRepository: Repository<User>;

  before(async function () {
    ds = await AppDataSource.initialize();
    profileRepository = ds.getRepository(Profile);
    userRepository = ds.getRepository(User);
  });

  after(async function () {
    await ds.destroy();
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
