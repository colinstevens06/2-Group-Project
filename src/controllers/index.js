module.exports = {
  auth: require("./auth"),
  matching: require("./matching")
};
var express = require("express");

var router = express.Router();

var pokeUser = require("../models/poke_user");

router.post("/api/new", function(req, res) {
  console.log("Pokemon Data:");
  console.log(req.body);

  return res;
});

router.get("/", function(req, res) {
  res.render("partials/index");
});

router.get("/profile", function(req, res) {

    pokeUser.findOne(
        {
            attributes: ["user_ID", "user_charName", "user_Fname", "user_Lname", "user_email"]
        }
    )
        .then(pUser => {
            res.render("partials/profile", {pUser});
        })
        .catch(err => console.log("Error: " + err))
});

module.exports = router;
