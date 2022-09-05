const Joi = require("joi");
const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password"),
  });
  const validation = schema.validate(data, { abortEarly: false });
  return validation;
};

module.exports = signupValidation;
