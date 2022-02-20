import { chance } from "./index";
import { Document, Types } from "mongoose";

import { Category, CategoryBase } from "../../src/models";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type CategoryDocument = Document<unknown, any, CategoryBase> &
  CategoryBase & { _id: Types.ObjectId };

type GenerateCategory = Promise<{
  category: CategoryDocument;
}>;

export async function generateCategory(): GenerateCategory {
  const category = await Category.create({
    name: chance.guid(),
    description: chance.guid(),
  });

  return { category };
}
