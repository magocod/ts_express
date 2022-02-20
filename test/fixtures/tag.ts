import { chance } from "./index";
import { Document, Types } from "mongoose";

import { Tag, TagBase } from "../../src/models";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type TagDocument = Document<unknown, any, TagBase> &
  TagBase & { _id: Types.ObjectId };

type GenerateCategory = Promise<{
  tag: TagDocument;
}>;

export async function generateTag(): GenerateCategory {
  const tag = await Tag.create({
    name: chance.guid(),
    slug: chance.guid(),
    tutorials: [],
  });

  return { tag };
}
