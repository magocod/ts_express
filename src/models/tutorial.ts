import { Schema, model } from "mongoose";

import { CommentBase } from "./comment";

export interface TutorialImage {
  url: string;
  caption: string;
}

export interface TutorialBase {
  title: string;
  description: string;
  published: boolean;
  images: TutorialImage[];
  comments: Schema.Types.ObjectId[];
  category: Schema.Types.ObjectId;
}

const schema = new Schema<TutorialBase>(
  {
    title: String,
    description: String,
    published: Boolean,
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String, required: true },
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const Tutorial = model<TutorialBase>("Tutorial", schema);
