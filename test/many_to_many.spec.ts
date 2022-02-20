import { assert } from "chai";
import "../src/app.es6";

// import { Document, Types } from "mongoose";

import { generateTutorial, generateTag } from "./fixtures";
import { Tag } from "../src/models";

describe("many_to_many", () => {
  it("referencing", async () => {
    const { tutorial } = await generateTutorial({
      images: { quantity: 0 },
      comments: { quantity: 0 },
      category: null,
      tags: { quantity: 2 },
    });

    // console.log(tutorial.toJSON());

    assert.isTrue(Array.isArray(tutorial.tags), "tutorial.tags");
  });

  it("referencing, inverse relationship", async () => {
    const { tutorial } = await generateTutorial();

    const { tag } = await generateTag();
    tag.tutorials.push(tutorial._id);
    await tag.save();

    const populatedTag = await Tag.findById(tag._id).populate("tutorials");

    // console.log(tag.toJSON());
    // console.log(populatedTag);

    assert.isTrue(Array.isArray(tag.tutorials), "tag.tutorials");
    assert.isNotNull(populatedTag, "populatedTag");
  });
});
