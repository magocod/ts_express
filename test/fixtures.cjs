const mongoose = require("mongoose");

// Currently this is the most effective method.
// - has the inconvenience, you have to write down the connection to close

const url = "mongodb://localhost:27017/test";

let mongooseConnection;

exports.mochaGlobalSetup = async function () {
  mongooseConnection = await mongoose.connect(url);
};

exports.mochaGlobalTeardown = async function () {
  if (mongooseConnection) {
    await mongooseConnection.connection.close();
  }
};
