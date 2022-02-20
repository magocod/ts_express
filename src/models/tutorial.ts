import { Schema, model } from "mongoose";

export interface TutorialBase {
  title: string;
  description: string;
  published: boolean;
}

const schema = new Schema<TutorialBase>(
  {
    title: String,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

export const Tutorial = model<TutorialBase>("Tutorial", schema);
