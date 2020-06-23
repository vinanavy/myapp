/* eslint-disable max-len */
const joi = require('@hapi/joi');

const schema = {
  user: joi.object({
    id: joi.number().integer().max(100).required(),
    username: joi.string().max(25).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: joi.string().email().required(),
  }),
};
module.exports = schema;
