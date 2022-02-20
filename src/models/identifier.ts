import { Schema, model } from "mongoose";

export interface IdentifierBase {
    cardCode: string;
    customer: Schema.Types.ObjectId;
}

const schema = new Schema<IdentifierBase>(
    {
        cardCode: String,
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer"
        }
    },
);

export const Identifier = model<IdentifierBase>("Identifier", schema);
