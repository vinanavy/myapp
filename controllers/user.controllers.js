/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const validation = require('../validations/user.validations');

exports.getAll = async (req, res) => {
  User.getAll((err, user) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: 'Something wrong',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List user',
      data: user,
    });
  });
};

exports.getById = async (req, res) => {
  User.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: 'Something wrong',
      });
    }
    return res.json({
      success: true,
      data: result,
    });
  });
};

exports.insertUser = async (req, res) => {
  // Validate
  const {errValidate} = validation.insertValidation(req.body);
  if (errValidate) {
    res.json({
      success: false,
      error: errValidate.details[0].message,
    });
  }
  // Password encryption
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const data = {
    'id': req.body.id,
    'username': req.body.username,
    'password': hashPass,
    'email': req.body.email,
    'roleId': req.body.roleId,
  };
  User.insertUser(data, (err, result) => {
    if (err) {
      res.status(404).json({
        message: 'Something wrong',
      });
    }
    return res.json({
	  status: 'success',
	  message: 'User create successfully',
      data: result,
    });
  });
};

exports.removeUser = async (req, res) => {
  User.removeUser(req.params.id, (err, result) => {
    if (err) {
	  return res.json({
		  success: false,
		  message: 'something wrong',
	  });
    }
    return res.json({
	  success: true,
	  message: 'delete successfully',
	  dat: result,
    });
  });
};
