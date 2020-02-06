var path = require("path")

// where we use middleware files. Possibly my isAuthenticated file.
// or whichever Jono thinks would be best. This file uses isAuthenticated

var isAuthenticated = require("../middleware/isAuthenticated")

module.exports = function(app) {

    app.get("/", function(req, res) {
        // if user is signing up send to signup page
        if (req.user) {
            res.redirect("/signup");
        }
        res.sendFile(path.join(__dirname, "../signup.html"))
    });

    app.get("/login", function(req, res) {
// if user has account, sent to profile page
        if (req.user) {
            res.redirect("/profile");
        }
        res.sendFile(path.join(__dirname, "../profile.html"));
    });
// Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/profile", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../signup.html"));
    });
};

    