const { Sequelize } = require("sequelize");

const sqlz = new Sequelize(process.env.JAWSDB_URL, {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sqlz;
