import { assert } from "chai";

import { faker } from "@faker-js/faker";

import { DataSource, Repository, In } from "typeorm";

// import { AppDataSource } from "../src/data-source";
import { dataSourceFactory } from "../src/data_source";

const AppDataSource = dataSourceFactory();

import { Photo, User, PhotoType } from "../src/entity";

import { generateUser } from "./fixtures/user";

describe("one-to-many", () => {
  let ds: DataSource;
  let photoRepository: Repository<Photo>;
  let photoTypeRepository: Repository<PhotoType>;
  let userRepository: Repository<User>;

  before(async () => {
    ds = await AppDataSource.initialize();
    photoRepository = ds.getRepository(Photo);
    photoTypeRepository = ds.getRepository(PhotoType);
    userRepository = ds.getRepository(User);
  });

  after(async () => {
    await ds.destroy();
  });

  it("repository create", async () => {
    const { user } = await generateUser(ds);

    const photoType = await photoTypeRepository.save(
      await photoTypeRepository.create({
        name: faker.animal.insect(),
      })
    );

    const photoBaseA = photoRepository.create({
      url: faker.internet.url(),
      user,
      photoType,
    });
    const photoA = await photoRepository.save(photoBaseA);
    // console.log(photoA);

    await photoRepository.save(
      photoRepository.create({
        url: faker.internet.url(),
        user,
        photoType,
      })
    );

    const userFound = await userRepository.findOne({
      where: { id: user.id },
      relations: ["photos", "photos.photoType"],
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
        .loadRelationCountAndMap("u.photos_count", "u.photos");

      const count = await query.clone().getCount();
      const results = await query.take(5).getManyAndCount();
      console.log(count);
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
        .where("photos.url like :protocol", { protocol: `%${"https"}%` })
        .loadRelationCountAndMap("u.photos_count", "u.photos");

      const count = await query.clone().getCount();
      const results = await query.take(2).getManyAndCount();
      console.log(count);
      console.log(results);
    });

    it("user.photos, filter by photo.url, http", async () => {
      const query = userRepository
        .createQueryBuilder("u")
        .leftJoin("u.photos", "photos")
        .where("photos.url like :protocol", { protocol: `%${"http"}%` })
        .loadRelationCountAndMap("u.photos_count", "u.photos");

      const count = await query.clone().getCount();
      const results = await query.take(2).getManyAndCount();
      console.log(count);
      console.log(results);
    });

    it("user.photos, filter by nested photo.photo_type, orange", async () => {
      const query = userRepository
        .createQueryBuilder("u")
        .leftJoin("u.photos", "photos")
        .leftJoinAndSelect("photos.photoType", "photoType")
        .where("photoType.name like :name", { name: `%${"bee"}%` })
        .loadRelationCountAndMap("u.photos_count", "u.photos");

      const count = await query.clone().getCount();
      const results = await query.take(2).getManyAndCount();
      console.log(count);
      console.log(results);
      const userIds = results[0].map((u) => {
        return u.id
      })

      const userFound = await userRepository.find({
        where: { id: In(userIds) },
        relations: ["photos", "photos.photoType"],
      });
      console.log(userFound);
      console.log(JSON.stringify(userFound, null, 2));
    });

    //   it("user.photos, filter by nested photo.photo_type, orange", async () => {
    //     const results = await userRepository.findAndCount({
    //       where: {
    //           photoType: { name: Like(`%${"orange"}%`) }
    //       },
    //       join: {
    //         alias: "user",
    //         leftJoinAndSelect: {
    //           photos: "user.photos",
    //           photo_type: "photos.photoType",
    //         },
    //       },
    //     });
    //     console.log(results);
    //   });
    // });

    describe("photo, load data", function () {
      it("eager loading, photo", async () => {
        const results = await photoRepository.find({
          relations: ["user"],
          take: 3,
        });
        console.log(results);
      });
    });
  });
});
