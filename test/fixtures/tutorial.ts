import { chance } from "./index";
import { Document, Schema, Types } from "mongoose";

import {
  Tutorial,
  TutorialBase,
  TutorialImage,
  Comment,
  CommentBase,
  Category,
} from "../../src/models";

import { generateCategory, CategoryDocument } from "./category";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type TutorialDocument = Document<unknown, any, TutorialBase> &
  TutorialBase & { _id: Types.ObjectId };

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type CommentDocument = Document<unknown, any, CommentBase> &
  CommentBase & { _id: Types.ObjectId };

type GenerateTutorial = Promise<{
  tutorial: TutorialDocument;
  comments: CommentDocument[];
  category: CategoryDocument | null;
}>;

interface ConfigTutorial {
  images: {
    quantity: number;
  };
  comments: {
    quantity: number;
  };
  category: Types.ObjectId | null;
}

export async function generateTutorial(
  config: ConfigTutorial = {
    images: {
      quantity: 1,
    },
    comments: {
      quantity: 1,
    },
    category: null,
  }
): GenerateTutorial {
  const images: TutorialImage[] = [];

  // const commentIds: Types.ObjectId[] = [];
  const comments: CommentDocument[] = [];

  if (config.images.quantity > 0) {
    for (let i = 0; i < config.images.quantity; i++) {
      images.push({
        caption: chance.guid(),
        url: chance.url(),
      });
    }
  }

  let categoryId = config.category;
  let category: CategoryDocument | null;

  if (categoryId === null) {
    const payload = await generateCategory();
    categoryId = payload.category._id;
    category = payload.category;
  } else {
    category = await Category.findById(categoryId);
  }

  const tutorial = await Tutorial.create({
    title: chance.guid(),
    description: chance.guid(),
    published: chance.bool({ likelihood: 50 }),
    images,
    category: categoryId,
  });

  if (config.comments.quantity > 0) {
    for (let i = 0; i < config.comments.quantity; i++) {
      const comment = await Comment.create({
        username: chance.first(),
        text: chance.guid(),
        createdAt: new Date(),
      });
      comments.push(comment);
      tutorial.comments.push(comment._id as unknown as Schema.Types.ObjectId);
    }
  }

  await tutorial.save();

  return { tutorial, comments, category };
}
