const { Server } = require("colyseus");
const { createServer } = require("http");

/**
 * Creates a new Colyseus server.
 *
 * @param {*} svr - Express server.
 */
const createGameServer = async svr => {
  return new Server({ server: createServer(svr) });
};

module.exports = {
  createGameServer
};
