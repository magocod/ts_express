import { assert } from "chai";
import "../src/app.es6";

// import { Document, Types } from "mongoose";

import { generateTutorial } from "./fixtures";
import { Tutorial } from "../src/models";

describe("one_to_many", () => {
  it("few", async () => {
    const { tutorial } = await generateTutorial({
      images: { quantity: 2 },
      comments: { quantity: 0 },
      category: null,
      tags: { quantity: 0 },
    });

    // console.log(tutorial.toJSON());

    assert.isTrue(Array.isArray(tutorial.images), "identifiers");
  });

  it("many", async () => {
    const { tutorial } = await generateTutorial({
      images: { quantity: 0 },
      comments: { quantity: 2 },
      category: null,
      tags: {
        quantity: 0,
      },
    });

    const tutorials = await Tutorial.find({ _id: tutorial._id }).populate(
      "comments"
    );

    // console.log(tutorial.toJSON());
    // console.log(tutorials);

    assert.isTrue(Array.isArray(tutorial.images), "tutorial.images");
    assert.isTrue(Array.isArray(tutorials), "tutorials");
  });

  it("lot", async () => {
    const { tutorial } = await generateTutorial();
    const tutorials = await Tutorial.find({ _id: tutorial._id }).populate(
      "category"
    );

    // console.log(tutorial.toJSON());
    // console.log(tutorials);

    assert.isNotNull(tutorial, "tutorial");
    assert.isTrue(Array.isArray(tutorials), "tutorials");
  });
});
