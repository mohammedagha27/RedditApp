const Joi = require("joi");
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data, { abortEarly: false });
  return validation;
};

module.exports = loginValidation;
