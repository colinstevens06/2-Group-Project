const schemas = require("@colyseus/schema");
const { Schema } = require("@colyseus/schema");
const PlayerState = require("./PlayerState");

class GameState extends Schema {}

schemas.defineTypes(GameState, {
  players: [PlayerState]
});

module.exports = GameState;
