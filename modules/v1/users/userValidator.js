const userValidator = {};
const Joi = require("joi");
const { errorResponse } = require("../../../utils/helpers");
const { Users } = require("../../../models");
const Modals = require("../../../models");

userValidator.validateAddUser = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(40).required(),
    age: Joi.number().integer().min(16),
    password: Joi.string.required()
  });
  const data = req.body;
  const { error } = schema.validate(data);
  if (error)
    return errorResponse(res, {
      message: error.details[0].message,
      status: 422,
    });
  else return next();
};

module.exports = userValidator;
