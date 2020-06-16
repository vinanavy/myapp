const joi = require('@hapi/joi');

module.exports = {
  insertValidation: (data) => {
    const schema = joi.object({
      id: joi.number().required(),
      username: joi.string().min(3).max(30).required(),
      password: joi.string().min(6).required(),
      email: joi.string().min(8).required().email(),
      roleId: joi.number().required(),
    });
    return schema.validate(data);
  },
};
