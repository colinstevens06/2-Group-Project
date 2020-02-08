const joi = require("@hapi/joi");
const WsMsgTypes = require("./WsMsgTypes");

const MessageSchema = joi.object({
  type: joi
    .string()
    .allow(...Object.values(WsMsgTypes))
    .required(),
  payload: joi.object().required()
});

module.exports = {
  MessageSchema
};
