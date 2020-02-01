const express = require("express");
const cors = require("cors");

/**
 * Creates a new Express server.
 */
const initExpressServer = async () => {
  const svr = express();

  // Configuration
  // TODO restrict origin
  svr.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
  svr.use(express.json());

  // TODO API
  const apiRoot = "/api/";

  return svr;
};

module.exports = {
  initExpressServer,
  initGameServer: require("./GameServer")
};
