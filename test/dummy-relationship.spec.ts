import { assert, expect } from "chai";

import { faker } from "@faker-js/faker";

import { DataSource, Repository, MoreThan, LessThan, IsNull, Not } from "typeorm";

// import { AppDataSource } from "../src/data-source";
import { dataSourceFactory } from "../src/data_source";

const AppDataSource = dataSourceFactory();

import { Dummy, User } from "../src/entity";

import { generateUser } from "./fixtures/user";
import { describe } from "mocha";

describe("dummy-relationship", function () {
  let ds: DataSource;
  let dummyRepository: Repository<Dummy>;
  let userRepository: Repository<User>;

  before(async function () {
    ds = await AppDataSource.initialize();
    dummyRepository = ds.getRepository(Dummy);
    userRepository = ds.getRepository(User);
  });

  after(async function () {
    await ds.destroy();
  });

  it("save relationship", async function () {
    const { user } = await generateUser(ds);

    const dummyNull = await dummyRepository.save(
      await dummyRepository.create({
        name: faker.animal.insect(),
      })
    );

    const dummyUser = await dummyRepository.save(
      await dummyRepository.create({
        name: faker.animal.insect(),
        user_id: user.id,
      })
    );

    const falseUserId = 100000;

    const dummyFalse = await dummyRepository.save(
      await dummyRepository.create({
        name: faker.animal.insect(),
        user_id: falseUserId,
      })
    );

    assert.isNull(dummyNull.user_id);
    assert.equal(dummyUser.user_id, user.id);
    assert.equal(dummyFalse.user_id, falseUserId);
  });

  describe("get relationship", function () {
    it("get relationship, dummy", async function () {
      const [rows, total] = await dummyRepository.findAndCount({
        relations: {
          user: true,
        },
        take: 5,
      });

      console.log(total);
      console.log(JSON.stringify(rows, null, 2));
      expect(rows).to.have.length.above(0);
    });

    it("get relationship, dummy, user !== null", async function () {
      const [rows, total] = await dummyRepository.findAndCount({
        where: {
          // user_id: Not(IsNull()),
          user_id: Not(IsNull()),
        },
        relations: {
          user: true,
        },
        take: 5,
      });

      console.log(total);
      console.log(JSON.stringify(rows, null, 2));
      expect(rows).to.have.length.above(0);
    });

    it("get relationship, dummy, user === null", async function () {
      const [rows, total] = await dummyRepository.findAndCount({
        where: {
          user_id: IsNull(),
        },
        relations: {
          user: true,
        },
        take: 5,
      });

      console.log(total);
      console.log(JSON.stringify(rows, null, 2));
      expect(rows).to.have.length.above(0);
    });

    it("get relationship, user", async function () {
      const [rows, total] = await userRepository.findAndCount({
        relations: {
          dummies: true,
        },
        take: 5,
      })

      console.log(total);
      console.log(JSON.stringify(rows, null, 2));
      expect(rows).to.have.length.above(0);
    });

    it("get relationship, user, dummies > 0", async function () {
      const [rows, total] = await userRepository.findAndCount({
        where: {
          dummies: MoreThan(0),
        },
        relations: {
          dummies: true,
        },
        take: 5,
      });

      console.log(total);
      console.log(JSON.stringify(rows, null, 2));
      expect(rows).to.have.length.above(0);
    });

    it("get relationship, user, dummies == 0", async function () {
      const [rows, total] = await userRepository.findAndCount({
        where: {
          dummies: LessThan(1),
        },
        relations: {
          dummies: true,
        },
        take: 5,
      });

      console.log(total);
      console.log(JSON.stringify(rows, null, 2));
      expect(rows).to.have.length.above(0);
    });
  });
});
