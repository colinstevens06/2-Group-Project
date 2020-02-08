const { Controller, Methods } = require("subtroller");
const { packetier } = require("packetier");
const { Mon, User } = require("../models");
const joi = require("@hapi/joi");

const monUpdateSchema = joi.object({
  mid: joi
    .number()
    .min(1)
    .max(6)
    .required(),
  name: joi
    .string()
    .min(1)
    .max(255)
    .lowercase()
    .required(),
  move1: joi.string(),
  move2: joi.string(),
  move3: joi.string(),
  move4: joi.string()
});

const ctrlr = new Controller()
  .make("get", "user", async (req, res, next) => {
    // TODO ?
  })
  /**
   * Gets all mons a user has.
   * Authorized
   */
  .make(Methods.GET, "team", async (req, res) => {
    let results;
    try {
      results = await Mon.findAll({ where: { uid: req.user.uid } });
    } catch (error) {
      console.log(error);
      return res.end();
    }

    return res
      .status(200)
      .json(packetier(true, { team: results.map(r => r.get()) }));
  })
  /**
   * Set a user's mon. expects: monUpdateSchema
   * Authorized
   */
  .make(Methods.PUT, "team", async (req, res) => {
    // validate body
    try {
      req.body = await monUpdateSchema.validateAsync(req.body);
    } catch (error) {
      return res
        .status(400)
        .json(packetier(false, null, { err: error.message }));
    }

    // If mon dne, create it
    let mon, isNew;
    try {
      [mon, isNew] = await Mon.findOrCreate({
        defaults: { ...req.body, uid: req.user.uid },
        where: { mid: req.body.mid }
      });
    } catch (error) {
      console.log(error);
      return res.end();
    }

    // If the mon was not newly created, update it
    if (!isNew) {
      try {
        mon = await mon.update(req.body);
      } catch (error) {
        console.error(error);
        req.status(500).end();
      }
    }

    return res.status(201).json(packetier(true, { mon }, { newRecord: isNew }));
  });

module.exports = ctrlr;
