// user.model.js
const db = require('../common/connect');
const jwt = require('jsonwebtoken');
const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.getByEmail = function (email, callback) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, email, (err, result) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

User.create = function (data, callback) {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, data, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

User.generateToken = function (user) {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, 'secret');
};

module.exports = User;