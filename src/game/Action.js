const Battlefield = require("./Battlefield");

/**
 * @class
 */
class Action {
  /**
   * @param {Action~handler} handler - Action handler takes battlefield
   */
  constructor(handler) {
    this.handler = handler;
  }

  async handle(battlefield) {
    return await this.handler(battlefield);
  }
}

const Actions = {
  ATTACK: new Action(async bf => {})
};

Object.freeze(Actions);

/**
 * @param {string} string - The string to attempt to pull an Action from.
 * @returns {{Action|null}} The action linked to the given string
 * or null if not found
 */
const from = string => {};

module.exports = {
  Action
};

//
/**
 * Handler docs
 * @callback Action~handler
 * @param {Battlefield} battlefield - The battlefield which is handling the action.
 * @returns {*}
 */
//
