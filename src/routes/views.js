const { join } = require("path");
const express = require("express");
const router = express.Router();
const {
  auth: { requireToken }
} = require("../middleware");

// set the static route for the handlebars pages
router.use("/", express.static(join("..", "..", "public")));

router.get("/", function(req, res) {
  // if user is signing up send to signup page
  if (req.user) {
    res.redirect("/signup");
  }
  res.sendFile(path.join(__dirname, "../signup.html"));
});

router.get("/login", function(req, res) {
  // if user has account, sent to profile page
  if (req.user) {
    res.redirect("/profile");
  }
  res.sendFile(path.join(__dirname, "../profile.html"));
});

/**
 * Here we've add our isAuthenticated middleware to this route.
 * If a user who is not logged in tries to access this route
 * they will be redirected to the signup page
 */
router.get("/profile", requireToken, function(req, res) {
  res.sendFile(path.join(__dirname, "../signup.html"));
});

module.exports = router;
