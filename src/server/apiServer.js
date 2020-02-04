const express = require("express");
const cors = require("cors");
const routes = require("../routes");

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

  svr.use(apiRoot + "match", routes.matching);

  return svr;
};

module.exports = initExpressServer;
