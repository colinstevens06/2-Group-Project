const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.define("poke_user", {
  user_ID: {
    type: Sequelize.INTEGER
  },
  user_charName: {
    type: Sequelize.STRING
  },
  user_Fname: {
    type: Sequelize.STRING
  },
  user_Lname: {
    type: Sequelize.STRING
  },
  user_email: {
    type: Sequelize.STRING
  },
  user_passwd: {
    type: Sequelize.STRING
  }
},
{
  freezeTableName: true
}
);