var express = require("express");

var router = express.Router();

var pokemon = require("../models/pokemon.js");

router.post("/api/new", function(req, res) {
    console.log("Pokemon Data:");
    console.log(req.body);



    
  router.get("/", function(req, res) {
      res.redirect("/api/all")
// res.render("index")
  })


  }

  )

module.exports = router