/* eslint-disable space-before-blocks */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
// const validation = require('../validations/user.validations');

exports.getAll = async (req, res) => {
  User.getAll((err, user) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: 'Something went wrong',
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
	  if (err.kind === 'not found'){
        res.status(404).send({
		  message: `not found user with id ${req.params.id}`,
        });
	  } else {
        res.status(500).send({
		  message: 'error retrieving user with id ' + req.params.id,
        });
	  }
    } else res.send(result);
  });
};

exports.insertUser = async (req, res) => {
  // Validate
//   const {error} = validation.insertValidation(req.body);
//   if (error) {
//     res.status(403).json({
//       success: false,
//       error: error.details[0].message,
//     });
//   }
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
        message: 'Something went wrong',
      });
    }
    return res.json({
	  status: 'Success',
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
        message: 'Something went wrong',
	  });
    }
    return res.json({
	  success: true,
	  message: 'Delete successfully',
	  dat: result,
    });
  });
};
