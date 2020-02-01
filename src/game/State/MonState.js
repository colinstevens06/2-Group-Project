const schemas = require("@colyseus/schema");
const { Schema } = require("@colyseus/schema");

class MonState extends Schema {
  constructor(name, hp) {
    super();
    this.name = name;
    this.hp = hp;
  }
}

schemas.defineTypes(MonState, {
  name: "string",
  hp: "uint16"
});

module.exports = MonState;
