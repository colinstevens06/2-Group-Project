const { Controller, Methods } = require("subtroller");
const { packetier } = require("packetier");
const { WarMap } = require("../game");
const { User } = require("../models");

const ctrlr = new Controller()
  /**
   * Returns the number of open lobbies.
   */
  .make("get", "status", async (_, res) => {
    res.json(
      packetier(true, {
        open: WarMap.filter(([_, bf]) => bf.open).map(({ id, bf }) => ({
          id,
          name: bf.lobbyName
        }))
      })
    );
  })
  .make(Methods.GET, "leaderboard", async (_, res) => {
    const users = await User.findAll();
    // TODO sad
    return res.json(packetier(true, { users }));
  });

module.exports = ctrlr;
