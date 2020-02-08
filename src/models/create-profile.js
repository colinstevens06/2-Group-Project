const Sequelize = require("sequelize");
const sequelize = require("../config/config")

module.exports = function (sequelize, DataTypes) {
  const UserProfile = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    pokemon1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon3: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon4: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon5: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon6: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  // I am also sending data for 4 moves for each pokemon, and power for those moves, but I guess we don't need to store that in the DB? Maybe we do axios calls or something to get that info? I'm not 100% certain on that one. would have to get the sprites, too. Good thing: I already have these mapped out on front-end, could jsut convert them to AXIOS calls on the backend to get the data and then send it to front end... maybe?

  return UserProfile;

}

