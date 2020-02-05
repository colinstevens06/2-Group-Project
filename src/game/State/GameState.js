const PlayerState = require("./PlayerState");
const GamePhase = require("./GamePhase");

class GameState {
  constructor() {
    this.host = null;
    this.challenger = null;
    this.phase = GamePhase.WAITING;
    this.turn = 0;
    this.countdown = -1;
  }

  /**
   *
   * @param {string} clientID -
   * @param {string} username -
   */
  setHost(clientID, username) {
    this.host = new PlayerState(clientID, username);
    return this.host;
  }

  /**
   *
   * @param {string} clientID -
   * @param {string} username -
   */
  setChallenger(clientID, username) {
    this.challenger = new PlayerState(clientID, username);
    return this.challenger;
  }

  /**
   *
   * @param {string} clientID - The ID of the player client to find.
   *
   * @returns {PlayerState} The player with the given clientID or null if
   * neither player has the ID.
   */
  player(clientID) {
    if (this.host.cid === clientID) {
      return this.host;
    } else if (this.challenger && this.challenger.cid === clientID) {
      return this.challenger;
    } else {
      return null;
    }
  }
}

module.exports = GameState;
