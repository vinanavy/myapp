/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
const joi = require('@hapi/joi');

const schema = {
  user: joi.object({
    id: joi.number().min(1).message({
	  'number.base': 'id invalid type, id must be number',
	  'number.empty': 'id is not allowed to be empty',
	  'any.required': 'id is required',
    }).positive().required(),
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports = schema;
