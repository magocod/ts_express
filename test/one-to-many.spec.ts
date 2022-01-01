import { assert } from "chai";

import faker from "faker";

import { createConnection, Connection, Repository } from "typeorm";

import { Photo, User } from "../src/entity";

import { generateUser } from "./fixtures/user";

describe("one-to-many", () => {
  let connection: Connection;
  let photoRepository: Repository<Photo>;
  let userRepository: Repository<User>;

  before(async () => {
    connection = await createConnection();
    photoRepository = connection.getRepository(Photo);
    userRepository = connection.getRepository(User);
  });

  after(async () => {
    await connection.close();
  });

  it("repository create", async () => {
    const { user } = await generateUser(connection);

    const photoBaseA = photoRepository.create({
      url: faker.internet.url(),
      user,
    });
    const photoA = await photoRepository.save(photoBaseA);
    console.log(photoA);

    await photoRepository.save(
      photoRepository.create({
        url: faker.internet.url(),
        user,
      })
    );

    const userFound = await userRepository.findOne({
      where: { id: user.id },
      relations: ["photos"],
    });
    console.log(userFound);
  });

  it("repository eager loading, user", async () => {
    const results = await userRepository.find({
      relations: ["photos"],
    });
    console.log(results);
  });

  it("repository eager loading, photo", async () => {
    const results = await photoRepository.find({
      relations: ["user"],
    });
    console.log(results);
  });
});
