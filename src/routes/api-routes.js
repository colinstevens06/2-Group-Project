var db = require("../models");

module.exports = function(app) {

// signup

app.post("/api/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
        
        .catch(function(err) {
            res.status(401).json(err);
            
        });
});


 
app.post('/login',function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
  });

// logout

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

// Route for getting user data to be used client side
app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(401).end({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
