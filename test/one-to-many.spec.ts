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

  describe("user, load data", function () {
    it("simple eager loading", async () => {
      const results = await userRepository.findAndCount({
        relations: ["photos"],
        take: 3,
      });
      console.log(results);
    });

    it("all, leftJoin", async () => {
      const query = userRepository
        .createQueryBuilder("u")
        .leftJoin("u.photos", "photos")
        .loadRelationCountAndMap("u.photos_count", "u.photos")

      const count = await query.clone().getCount()
      const results = await query.take(5).getManyAndCount();
      console.log(count)
      console.log(results);
    });

    it("innerJoin, user.photos > 0", async () => {
      const results = await userRepository
        .createQueryBuilder("u")
        .innerJoin("u.photos", "photos")
        .loadRelationCountAndMap("u.photos_count", "u.photos")
        .take(5)
        .getManyAndCount();
      console.log(results);
    });

    it("user.photos = 0", async () => {
      const results = await userRepository
        .createQueryBuilder("u")
        .leftJoin("u.photos", "photos")
        .where("photos.id IS NULL")
        .loadRelationCountAndMap("u.photos_count", "u.photos")
        .take(5)
        .getManyAndCount();
      console.log(results);
    });

    it("user.photos, filter by photo.url, https", async () => {
      const query = userRepository
          .createQueryBuilder("u")
          .leftJoin("u.photos", "photos")
          .where("photos.url like :protocol", { protocol:`%${'https'}%` })
          .loadRelationCountAndMap("u.photos_count", "u.photos")

      const count = await query.clone().getCount()
      const results = await query.take(2).getManyAndCount();
      console.log(count)
      console.log(results);
    });

    it("user.photos, filter by photo.url, http", async () => {
      const query = userRepository
          .createQueryBuilder("u")
          .leftJoin("u.photos", "photos")
          .where("photos.url like :protocol", { protocol:`%${'http'}%` })
          .loadRelationCountAndMap("u.photos_count", "u.photos")

      const count = await query.clone().getCount()
      const results = await query.take(2).getManyAndCount();
      console.log(count)
      console.log(results);
    });

  });

  describe("photo, load data", function () {
    it("eager loading, photo", async () => {
      const results = await photoRepository.find({
        relations: ["user"],
        take: 3,
      });
      console.log(results);
    });
  })
});
