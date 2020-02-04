/**
 * Enums for accepted Websocket message types.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const WsMsgType = {
  SETTINGS: "settings",
  JOIN: "join",
  LEAVE: "leave",
  START: "start",
  ACTION: "action",
  END: "end",
  ERR: "err"
};

Object.freeze(WsMsgType);

module.exports = WsMsgType;
