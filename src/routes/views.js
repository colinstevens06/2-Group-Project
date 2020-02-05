const express = require("express");
const router = express.Router();
const { join } = require("path");

//set the static route for the handlebars pages
router.use("/", express.static(join("..", "..", "public")));

// TODO Add more routes

module.exports = router;
