import { Schema, model } from "mongoose";

export interface CategoryBase {
  name: string;
  description: string;
}

export const categorySchema = new Schema<CategoryBase>(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

export const Category = model<CategoryBase>("Category", categorySchema);
