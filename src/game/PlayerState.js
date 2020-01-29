const schemas = require("@colyseus/schema");
const { Schema } = require("@colyseus/schema");
const MonState = require("./MonState");

class PlayerState extends Schema {}

schemas.defineTypes(PlayerState, {
  mons: [MonState]
});

module.exports = PlayerState;
