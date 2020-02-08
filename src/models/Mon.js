const { INTEGER, STRING } = require("sequelize");
const { User } = require(".");
const db = require("../config");

const monModel = db.define(
  "mon",
  {
    mid: { type: INTEGER, primaryKey: true, unique: true },
    uid: {
      type: INTEGER,
      references: {
        model: User,
        key: "uid"
      }
    },
    name: { type: STRING },
    move1: { type: STRING },
    move2: { type: STRING },
    move3: { type: STRING },
    move4: { type: STRING }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = monModel;
