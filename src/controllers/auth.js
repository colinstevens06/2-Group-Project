const { Controller } = require("subtroller");
const { packetier } = require("packetier");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { Token } = require("../TokenFarm");
const joi = require("@hapi/joi");

/** Number of salting rounds for password hashing. */
const SALT_ROUNDS = 13;

/**
 * Hashes the given password.
 *
 * @param {string} password Password to hash.
 * @returns {Promise<string>} The hashed password
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const enhash = async password => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Checks the given password against the given hash.
 *
 * @param {string} password The password to check.
 * @param {string} hash The hash to check against.
 * @returns {Promise<boolean>} `true` if the password was validated.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const checkHash = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/** Schema for new user */
const newUserSchema = joi.object({
  username: joi.string().max(50),
  name_first: joi.string().max(50),
  name_last: joi.string().max(50),
  email: joi.string().email(),
  password: joi.string()
});

// Validate Hash

const ctrlr = new Controller()
  .make("post", "signup", async (req, res, next) => {
    // Validate incoming body
    try {
      await newUserSchema.validateAsync(req.body);
    } catch (error) {
      return res
        .status(400)
        .json(packetier(false, null, { err: "Malformed data" }));
    }

    let hash;
    try {
      hash = await enhash(req.body.password);
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Failed to hash password" }));
    }

    let qr;
    try {
      qr = await User.create({
        username: req.body.username.trim(),
        name_first: req.body.name_first.trim(),
        name_last: req.body.name_last.trim(),
        email: req.body.email.trim(),
        pass_hash: hash
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json(packetier(false, null, { err: "An error occurred" }));
    }

    // get a usable user obj
    const cUser = qr.get();
    delete cUser.pass_hash;

    // Generate token
    const token = Token(cUser);

    // Send user and token
    res.status(201).json(packetier(true, { user: cUser }, { token }));
  })
  .make("post", "login", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!password) {
      return res
        .status(401)
        .json(packetier(false, null, { err: "Missing password" }));
    }

    // get user
    let user;
    try {
      user = await User.findOne({ where: { email } });
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }

    // Validate password
    console.log(password, " vs ", user.pass_hash);
    const authed = await checkHash(password, user.pass_hash);

    // Reject failed password
    if (!authed) {
      return res
        .status(401)
        .json(packetier(false, null, { err: "Invalid password" }));
    }

    const cUser = user.get();
    delete cUser.pass_hash;

    // make token
    const token = Token(cUser);

    // Send back user data and new token
    return res.status(200).json(packetier(true, { user: cUser }, { token }));
  });

module.exports = ctrlr;
