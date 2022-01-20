const Joi = require("@hapi/joi");

const addBookValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    amount: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports.addBookValidation = addBookValidation;
