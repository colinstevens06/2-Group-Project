const { Controller } = require("subtroller");

const ctrlr = new Controller()
  .make("post", "login", async (req, res, next) => {})
  .make("post", "register", (req, res, next) => {});

module.exports = ctrlr;
