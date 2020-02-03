var express = require("express");

var router = express.Router();

//var pokemon = require("../models/pokemon.js");

router.post("/api/new", function(req, res) {
  console.log("Pokemon Data:");
  console.log(req.body);

  return res;
});

router.get("/", function(req, res) {
  res.render("partials/index");
});

module.exports = router;