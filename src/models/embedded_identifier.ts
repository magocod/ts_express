import { Schema, model } from "mongoose";

import { customerSchema, CustomerBase } from "./customer";

export interface EmbeddedIdentifierBase {
  cardCode: string;
  customer: CustomerBase;
}

const schema = new Schema<EmbeddedIdentifierBase>({
  cardCode: String,
  customer: customerSchema,
});

export const EmbeddedIdentifier = model<EmbeddedIdentifierBase>(
  "EmbeddedIdentifier",
  schema
);
