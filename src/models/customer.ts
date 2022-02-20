import { Schema, model } from "mongoose";

export interface CustomerBase {
  name: string;
  age: number;
  gender: string;
}

export const customerSchema = new Schema<CustomerBase>(
  {
    name: String,
    age: Number,
    gender: String,
  },
  { timestamps: true }
);

export const Customer = model<CustomerBase>("Customer", customerSchema);
