// https://mochajs.org/#global-setup-fixtures
// https://github.com/sequelize/sequelize/issues/6758

// FIXME http server not close during tests

// const { shutDownServers } = require("./helpers");

let db;
// const db = require("../models");

exports.mochaGlobalSetup = function () {
  // console.log(`before all tests`);
  db = require("../dist/src/models");
  // const payloadIndex = require("../index");
  // this.server = payloadIndex.server;
  // this.ioObject = payloadIndex.ioObject;
};

exports.mochaGlobalTeardown = async function () {
  // console.log('after all tests');
  await db.sequelize.close();
  // server.close();
  // io.close();
  // await shutDownServers([this.server, this.ioObject]);
};
