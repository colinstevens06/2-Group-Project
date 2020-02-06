const Sequelize = require("sequelize");
const db = require("../config/config");

module.exports = db.define("user_session", {
    user_session_ID: {
        type: Sequelize.INTEGER
    },
    user_ID: {
        type: Sequelize.INTEGER
    },
    session_ID: {
        type: Sequelize.INTEGER
    },
    session_win: {
        type: Sequelize.BOOLEAN
    }
});