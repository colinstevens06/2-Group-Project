const { Server } = require("colyseus");
const { createServer } = require("http");
const { Battlefield } = require("../game");

/**
 * Creates a new Colyseus server.
 *
 * @param {*} svr - Express server.
 */
const initGameServer = async svr => {
  const gameServer = new Server({ server: createServer(svr) });

  gameServer.define("battle", Battlefield);

  return gameServer;
};

module.exports = initGameServer;
