const schemas = require("@colyseus/schema");
const { Schema } = require("@colyseus/schema");

class MonState extends Schema {}

schemas.defineTypes(MonState, {
  name: "string",
  hp: "uint16"
});

module.exports = MonState;
