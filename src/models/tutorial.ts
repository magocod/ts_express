import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface TutorialBase {
  title: string;
  description: string;
  published: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<TutorialBase>(
  {
    title: String,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

// 3. Create a Model.
export const Tutorial = model<TutorialBase>("Tutorial", schema);
