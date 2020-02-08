const express = require("express");
const cors = require("cors");
const routes = require("../routes");

/**
 * Creates a new Express server.
 */
const initExpressServer = async () => {
  const svr = express();

  // Configuration
  svr.use(
    cors({
      origin: "*", //"https://nottomon.herokuapp.com/",
      methods: ["GET", "POST", "PUT", "DELETE"]
    })
  );
  svr.use(express.json());
  svr.use(express.urlencoded({ extended: true }));

  // API
  const apiRoot = "/api/";

  svr.use(apiRoot + "user", routes.user);
  svr.use(apiRoot + "auth", routes.auth);
  svr.use(apiRoot + "match", routes.matching);

  // Views
  svr.use("/", routes.views);

  return svr;
};

module.exports = initExpressServer;
