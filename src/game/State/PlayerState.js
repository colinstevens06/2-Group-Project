const schemas = require("@colyseus/schema");
const { Schema, ArraySchema } = require("@colyseus/schema");
const MonState = require("./MonState");

class PlayerState extends Schema {
  constructor() {
    super();
    this.mons = new ArraySchema();
  }
}

schemas.defineTypes(PlayerState, {
  user: "object",
  mons: [MonState]
});

module.exports = PlayerState;
