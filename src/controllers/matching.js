const { Controller } = require("subtroller");
const { packetier } = require("packetier");
const { WarMap } = require("../game");

const ctrlr = new Controller()
  /**
   * Returns the number of open lobbies.
   */
  .make("get", "status", async (req, res) => {
    res.json(
      packetier(true, {
        open: WarMap.filter(([_, bf]) => bf.open).map(({ id, bf }) => ({
          id,
          name: bf.lobbyName
        }))
      })
    );
  });

module.exports = ctrlr;
