import { assert } from "chai";
import app from "../../src/app.es6";
import supertest from "supertest";

import { chance, generateTutorial } from "../fixtures";
import { addQueryString, basicPagination } from "../helpers";

import { TutorialBase, Tutorial } from "../../src/models";

const httpClient = supertest(app);

const baseRoute = "/tutorials";

function generateData(): TutorialBase {
  return {
    title: chance.guid(),
    description: chance.guid(),
    published: chance.bool({ likelihood: 50 }),
  };
}

describe("tutorial_crud", () => {
  describe("list", function () {
    it("findAll", async () => {
      await generateTutorial();
      const response = await httpClient.get(baseRoute);

      // console.log(response.body);
      assert.equal(response.status, 200);
    });

    it("findAll, paginate", async () => {
      await generateTutorial();
      const qs = basicPagination();
      qs.limit = 5;
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(response.body);
      assert.equal(response.status, 200);
    });

    it("findAll with qs", async () => {
      const { tutorial } = await generateTutorial();
      const qs = basicPagination();
      qs.title = tutorial.title.substring(3);

      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(response.body);
      assert.equal(response.status, 200);
    });

    it("findAllPublished", async () => {
      const qs = basicPagination();
      await generateTutorial();
      const response = await httpClient.get(
        addQueryString(`${baseRoute}/published`, qs)
      );

      // console.log(response.body);
      assert.equal(response.status, 200);
      assert.isTrue(
        response.body.every((t: TutorialBase) => {
          return t.published;
        })
      );
    });
  });

  it("create", async () => {
    const response = await httpClient.post(baseRoute).send(generateData());

    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("create, form error", async () => {
    const response = await httpClient.post(baseRoute).send({});

    // console.log(response.body);
    assert.equal(response.status, 400);
  });

  it("find", async () => {
    const { tutorial } = await generateTutorial();
    const id = tutorial.toJSON()._id;
    const response = await httpClient.get(`${baseRoute}/${id}`);

    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.equal(response.body._id, id, "tutorial._id");
  });

  it("find, 404", async () => {
    const id = "e";
    const response = await httpClient.get(`${baseRoute}/${id}`);

    // console.log(response.body);
    assert.equal(response.status, 500);
  });

  it("update", async () => {
    const { tutorial } = await generateTutorial();
    const original = tutorial.toJSON();
    const id = original._id;
    // console.log(original);

    const response = await httpClient
      .put(`${baseRoute}/${id}`)
      .send(generateData());

    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.notDeepEqual(response.body, original);
  });

  it("update, form error", async () => {
    const { tutorial } = await generateTutorial();
    const original = tutorial.toJSON();
    const id = original._id;
    // console.log(original);

    const response = await httpClient.put(`${baseRoute}/${id}`).send({});
    const updated = await Tutorial.findById(id);
    if (updated === null) {
      throw new Error("findById error");
    }

    // console.log(response.body);
    assert.equal(response.status, 400);
    assert.deepEqual(updated.toJSON(), original);
  });

  it("delete", async () => {
    const { tutorial } = await generateTutorial();
    const id = tutorial._id;
    const response = await httpClient.delete(`${baseRoute}/${id}`);

    const exist = await Tutorial.findById(id);
    assert.equal(response.status, 200);
    assert.isNull(exist);
  });
});
