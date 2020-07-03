/* eslint-disable no-tabs */
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.header('authentication');
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Token incorrect!!!',
          });
        } else {
          req.decode = decode,
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Auth token is not supplied!!!',
      });
    }
  },
};
