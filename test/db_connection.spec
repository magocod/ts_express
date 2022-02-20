import { assert } from "chai";
import mongoose from "mongoose";
import { dbConfig } from "../src/config/db.config";
import { UserModel } from "../src/models";

import { chance } from "./fixtures";

describe("db_connection", () => {
  let mongooseConnection: typeof mongoose;

  before(async function () {
    mongooseConnection = await mongoose.connect(dbConfig.url);
  });

  after(async function () {
    await mongooseConnection.connection.close();
  });

  it("model connection db", async () => {
    const user = await UserModel.create({
      name: chance.first(),
      email: chance.email(),
      avatar: chance.string({ length: 10 }),
    });
    // console.log(user.toJSON());
    assert.equal(typeof user, "object");
  });
});
