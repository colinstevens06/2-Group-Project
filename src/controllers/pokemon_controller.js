var express = require("express");
var router = express.Router();
var poke_user = require("../models/poke_user");


router.post("/api/new", function (req, res) {
  console.log("Pokemon Data:");
  console.log(req.body);

  return res;
});

router.get("/", function (req, res) {
  res.render("index.html");
});

router.get("/leaderboard", function(req, res) {
  res.render("leaderboard.html");
});

router.get("/battlefield", function(req, res) {
  res.render("battlefield.html");
})

router.get("/profile", function (req, res) {

  poke_user.findOne({
    attributes: ["user_ID", "user_charName", "user_Fname", "user_Lname", "user_email"]})
    .then(profileData => {
      let userData = {
        user_ID: profileData.get("user_ID"),
        user_charName: profileData.get("user_charName"),
        user_Fname: profileData.get("user_Fname"),
        user_Lname: profileData.get("user_Lname"),
        user_email: profileData.get("user_email")
      };
      res.render("profile.html", userData);
    })
    .catch(err => console.log("Error: " + err));
});

module.exports = router;