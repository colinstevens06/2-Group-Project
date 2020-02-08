const { Controller } = require("subtroller");

const ctrlr = new Controller().make("get", "one", async (req, res, next) => {
  User.findOne({
    attributes: [
      "user_ID",
      "user_charName",
      "user_Fname",
      "user_Lname",
      "user_email"
    ]
  })
    .then(pUser => {
      res.render("partials/profile", { pUser });
    })
    .catch(err => console.log("Error: " + err));
});

module.exports = ctrlr;
