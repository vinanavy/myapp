/* eslint-disable max-len */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
const {user} = require('./user.schema');
// const joi = require('@hapi/joi');
module.exports = {
  addUserValidation: async (req, res, next) => {
    const value = await user.validate(req.body);
    if (value.error) {
      res.json({
		  success: 0,
		  message: value.error.details[0].message,
      });
    } else {
	  next();
    }
  // eslint-disable-next-line comma-dangle
  }
};
