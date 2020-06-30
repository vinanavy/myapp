/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const db = require('../config/db.config');

class User {
  constructor(obj) {
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.email = obj.email;
  };

  static getAll(result) {
    db.query('select * from users', (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    });
  };

  static getById(id, result) {
    db.query('select * from users where id = ' + db.escape(id),
        (err, res) => {
		  if (err) result(err, null);
		  if (res.length) result(null, res[0]);
		  result({kind: 'not found'}, null);
        });
  };

  static getByUsername(username, result) {
    db.query('select * from users where username = ' + db.escape(username),
        (err, res) => {
          if (err) result(err, null);
          else result(null, res);
        });
  };

  static insertUser(newUser, result) {
    db.query('insert into users set ? ', newUser, (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    });
  };

  static removeUser(id, result) {
    db.query('delete from users where id = ' + db.escape(id), (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
};

module.exports = User;
