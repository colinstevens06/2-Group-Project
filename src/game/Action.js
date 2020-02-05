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
  ATTACK: new Action(async (bf, data) => {
    bf.broadcast(data.attack);
    // TODO handle attacks and validation
  }),
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
