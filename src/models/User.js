const { INTEGER, STRING } = require("sequelize");
const db = require("../config");

const userModel = db.define(
  "user",
  {
    uid: { type: INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    username: { type: STRING, unique: true },
    name_first: { type: STRING },
    name_last: { type: STRING },
    email: { type: STRING, validate: { is: /^.+@.+\..+$/ } },
    pass_hash: { type: STRING }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = userModel;
