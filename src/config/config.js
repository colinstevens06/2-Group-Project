const { Sequelize } = require("sequelize");

module.exports = new Sequelize("pokegame", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000
  },
});