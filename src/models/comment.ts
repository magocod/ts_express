import { Schema, model } from "mongoose";

export interface CommentBase {
  username: string;
  text: string;
  createdAt: Date;
}

export const commentSchema = new Schema<CommentBase>(
  {
    username: String,
    text: String,
    createdAt: Date,
  },
  { timestamps: true }
);

export const Comment = model<CommentBase>("Comment", commentSchema);
