const { packetier } = require("packetier");
const { decode } = require("jsonwebtoken");

/**
 * This is middleware for restricting routes a user is not allowed to visit if not logged in
 */
const requireToken = async (req, res, next) => {
  const token = req.headers.token;

  // If the user isn't logged in, redirect them to the login page
  if (!token) {
    res
      .status(401)
      .redirect("/")
      .json(packetier(false, null, { err: "Missing token" }));
    return;
  }

  req.token = token;
  req.user = decode(token);

  return next();
};

module.exports = { requireToken };
