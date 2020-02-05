const express = require("express");
const cors = require("cors");
const routes = require("../routes");
var exphbs = require("express-handlebars");

/**
 * Creates a new Express server.
 */
const initExpressServer = async () => {
  const svr = express();

  // Configuration
  // TODO restrict origin
  svr.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
    })
  );
  svr.use(express.json());
  svr.use(express.urlencoded({ extended: true }));

  //setup the view engine and define handlebars default layout
  svr.engine("handlebars", exphbs({ defaultLayout: "main" }));
  svr.set("view engine", "handlebars");

  // TODO API
  const apiRoot = "/api/";

  svr.use(apiRoot + "match", routes.matching);

  // TODO
  svr.use("/", routes.views);

  return svr;
};

module.exports = initExpressServer;
