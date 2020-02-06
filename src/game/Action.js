const { GamePhase } = require("./State");
const { socketier } = require("packetier");
const WsMsgType = require("./WsMsgTypes");
const PokeApi = require("../pokeapi");

class Action {
  /**
   * @param {Action~handler} handler - Action handler takes battlefield
   */
  constructor(handler) {
    this.handler = handler;
  }

  async handle(battlefield, data) {
    return await this.handler(battlefield, data);
  }
}

const Actions = {
  ATTACK: new Action(
    /**
     * @param {{attack: string, player: *}} data
     */
    async (bf, data) => {
      // Ensure game is playing
      if (bf.state.phase !== GamePhase.PLAYING) {
        return bf.send(
          data.client,
          socketier(WsMsgType.ERR, {
            msg: "Game has not started"
          })
        );
      }
      // Ensure it is the client's turn

      // TODO Validate attack
      let atkAPI;
      try {
        atkAPI = await PokeApi.getMoveByName(data.attack);
      } catch (error) {
        return bf.send(
          data.client,
          socketier(WsMsgType.ERR, {
            msg: "Attack no existy",
            attack: data.attack
          })
        );
      }

      // TODO Apply attack
      bf.inActivePlayer.outMon.hp -= atkAPI.power / 2;
      // TODO Update mon state

      // Update turn
      // !This must be last
      bf.state.turn = bf.state.turn === 0 ? 1 : 0;
    }
  ),
  SWITCH: new Action(async bf => {
    // TODO handle mon switching
  })
};

Object.freeze(Actions);

/**
 * @param {string} string - The string to attempt to pull an Action from.
 * @returns {Action} The action linked to the given string
 * or null if not found
 */
const from = string => {
  return Actions[string.toUpperCase()] || null;
};

module.exports = {
  Action,
  from
};
