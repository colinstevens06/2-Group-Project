const { Room } = require("colyseus");
const { GameState, PlayerState } = require("./State");

/**
 * Battlefield Room
 */
class Battlefield extends Room {
  constructor() {
    super();
    this.setState(new GameState());
  }

  // When room is initialized
  onCreate(options) {
    console.log("Created", this.roomId);
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  onAuth(client, options, request) {
    return true;
  }

  // When client successfully join the room
  onJoin(client, options, auth) {
    console.log("Joined", options);
    this.state.players.push(new PlayerState());
    this.broadcast({ user: options.user });
  }

  // When a client sends a message
  onMessage(client, message) {}

  // When a client leaves the room
  onLeave(client, consented) {}

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose() {}
}

module.exports = Battlefield;
