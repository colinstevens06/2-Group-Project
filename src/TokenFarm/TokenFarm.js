const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Creates a new JWT
 * @param {{email: string, uid: string}} param0
 */
const Token = ({ email, uid, username, name_first, name_last }) => {
  return sign({ email, uid, username, name_first, name_last }, JWT_SECRET, {
    issuer: "nottomon"
  });
};

/**
 * Validates a JWT.
 * @param {string} token - The JWT to validate.
 * @returns {object} The decoded token or `null` if invalid.
 */
const validate = token => {
  let decoded;
  try {
    decoded = verify(token, JWT_SECRET, { issuer: "nottomon" });
  } catch (error) {
    return null;
  }

  return decoded || null;
};

module.exports = { Token, validate };
