/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const {username, password} = req.body;
  User.getByUsername(username, async (err, result) => {
    if (err) {
      return res.status(404).json({
        status: false,
        message: 'Something wrong',
      });
    }
    if (!result[0]) {
      return res.status(401).json({
        status: false,
        message: 'Username wrong',
      });
    }
    const validPass = await bcrypt.compare(password, result[0].password);
    if (!validPass) {
      return res.status(401).json({
        status: false,
        message: 'Password wrong',
      });
    }
    const token = jwt.sign({username: username}, process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_LIFE});
    return res.json({
      status: true,
      message: 'Login successfully',
	  token: token,
    });
  });
};
