const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.define("game_session", {
    seesion_ID: {
        type: Sequelize.INTEGER
    },
    session_start: {
        type: Sequelize.DATE
    },
    session_end: {
        type: Sequelize.DATE
    }
});