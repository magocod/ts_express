import { assert } from "chai";
import "../src/app.es6";

import { Document, Types } from "mongoose";

import { chance } from "./fixtures";
import {
  Customer,
  CustomerBase,
  Identifier,
  IdentifierBase,
  EmbeddedIdentifier,
  EmbeddedIdentifierBase,
} from "../src/models";

type CreateCustomer = Promise<
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  Document<unknown, any, CustomerBase> & CustomerBase & { _id: Types.ObjectId }
>;

type CreateIdentifier = Promise<
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  Document<unknown, any, IdentifierBase> &
    IdentifierBase & { _id: Types.ObjectId }
>;

type CreateEmbeddedIdentifier = Promise<
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  Document<unknown, any, EmbeddedIdentifierBase> &
    EmbeddedIdentifierBase & { _id: Types.ObjectId }
>;

function createCustomer(): CreateCustomer {
  return Customer.create({
    name: chance.first(),
    age: chance.integer({ min: 0, max: 90 }),
    gender: chance.gender(),
  });
}

function createIdentifier(customer: Types.ObjectId | string): CreateIdentifier {
  return Identifier.create({
    cardCode: chance.guid(),
    customer,
  });
}

function createEmbeddedIdentifier(): CreateEmbeddedIdentifier {
  return EmbeddedIdentifier.create({
    cardCode: chance.guid(),
    customer: {
      name: chance.first(),
      age: chance.integer({ min: 0, max: 90 }),
      gender: chance.gender(),
    },
  });
}

describe("one_to_one", () => {
  it("referencing", async () => {
    const customer = await createCustomer();
    const identifier = await createIdentifier(customer._id);
    const identifiers = await Identifier.find({
      _id: identifier._id,
    }).populate("customer");

    // console.log(customer.toJSON());
    // console.log(identifier.toJSON());
    // console.log(identifiers);
    // console.log(String(identifier.customer));

    assert.equal(
      String(identifier.customer),
      customer._id.toString(),
      "customer._id"
    );
    assert.isTrue(Array.isArray(identifiers), "identifiers");
  });

  it("embedding", async () => {
    const identifier = await createEmbeddedIdentifier();

    // console.log(identifier.toJSON());

    assert.isNotNull(identifier, "identifier");
  });
});
