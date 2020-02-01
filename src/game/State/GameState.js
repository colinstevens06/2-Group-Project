const schemas = require("@colyseus/schema");
const { Schema, ArraySchema } = require("@colyseus/schema");
const PlayerState = require("./PlayerState");
const GamePhase = require("./GamePhase");

class GameState extends Schema {
  constructor(players) {
    super();
    this.players = new ArraySchema(players);
    this.phase = GamePhase.SETUP;
  }
}

schemas.defineTypes(GameState, {
  players: [PlayerState],
  phase: "string"
});

module.exports = GameState;
