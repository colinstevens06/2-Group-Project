const { packetier } = require("packetier");
const { validate } = require("../TokenFarm");

const pullToken = async (req, res, next) => {
  const token = req.headers.token || req.body.token;

  // If the user isn't logged in, redirect them to the login page
  if (!token) {
    return next();
  }

  req.token = token;
  req.user = validate(token);

  return next();
};

/**
 * This is middleware for restricting routes a user is not allowed to visit if not logged in
 */
const requireToken = async (req, res, next) => {
  await pullToken(req, res, () => {});

  if (!req.token) {
    res.status(401).json(packetier(false, null, { err: "Missing token" }));
    return;
  }

  return next();
};

module.exports = { requireToken };
