const BattleField = require("./Battlefield");

class WarMap {
  constructor() {
    /**
     * @type {Map<string, BattleField>}
     */
    this.internal = new Map();
  }

  set(bfID, bf) {
    this.internal.set(bfID, bf);
  }

  get(bfID) {
    return this.internal.get(bfID);
  }

  remove(bfID) {
    return this.internal.delete(bfID);
  }

  /**
   * @return {Array<string>} - A list of all active Battlefield IDs.
   */
  get ids() {
    return [...this.internal.keys()];
  }

  /**
   *
   * @param {function} filter - Function by which to filter the Battlefields.
   * Takes 1 map entry object and should return a boolean.
   *
   * @returns {Array<string>} Filtered BAttlefield IDs.
   */
  filter(filter) {
    return [...this.internal.entries()]
      .filter(filter)
      .map(([v, k]) => ({ id: v, bf: k }));
  }

  getByLobbyName(lobbyName, filter) {
    let src = [...this.internal.values()];

    if (typeof filter === "function") {
      src = src.filter(filter);
    }

    return src.find(v => v.lobbyName === lobbyName) || null;
  }
}

const warMap = new WarMap();

module.exports = warMap;
