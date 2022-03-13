import { assert } from "chai";

import faker from "faker";

import { createConnection, Connection, Repository } from "typeorm";

import { Category, Question } from "../src/entity";

describe("many-to-many", () => {
  let connection: Connection;
  let categoryRepository: Repository<Category>;
  let questionRepository: Repository<Question>;

  before(async () => {
    connection = await createConnection();
    categoryRepository = connection.getRepository(Category);
    questionRepository = connection.getRepository(Question);
  });

  after(async () => {
    await connection.close();
  });

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
