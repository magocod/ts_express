import { Schema, model, Types } from "mongoose";

export interface TagBase {
  name: string;
  slug: string;
  tutorials: Types.ObjectId[];
}

export const tagSchema = new Schema<TagBase>(
  {
    name: String,
    slug: String,
    tutorials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tutorial",
      },
    ],
  },
  { timestamps: true }
);

export const Tag = model<TagBase>("Tag", tagSchema);
