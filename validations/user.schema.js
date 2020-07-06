/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
const joi = require('@hapi/joi');

const schema = {
  user: joi.object({
    // id: joi.number().min(1).message({
    //   'id.base': 'id invalid type, id must be number',
    //   'id.empty': 'id is not allowed to be empty',
    //   'id.required': 'id is required',
    // }).positive().required(),
    username: joi.string().min(3).max(12).message({
      'username.base': 'username invalid type, username must be string',
      'username.empty': 'username is not allowed to be empty',
      'username.min': 'username must be more than 3 character {#limit}',
      'username.max': 'username must be less than 18 character {#limit}',
    }).required(),
    password: joi.string().min(6).message({
      'password.empty': 'password is not allowed to be empty',
      'password.min': 'password must be more than 6 character {#limit}',
    }).required(),
    email: joi.string().email().required(),
    roleId: joi.number().integer().message({
      'role.base': 'role id invalid type, role id must be number',
      'role.empty': 'role id is not allowed to be empty',
    }).positive().required(),
    // createAt: joi.date().timestamp().required(),
    // updateAt: joi.date().timestamp().required(),
  }),
};

module.exports = schema;
