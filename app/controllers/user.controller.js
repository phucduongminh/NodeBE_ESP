// user.controller.js
const User = require('../models/user.model');

const bcrypt = require('bcrypt');

exports.login = function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  User.getByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }
    bcrypt.compare(password, user.password, (err, validPassword) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      if (!validPassword) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid email or password' });
      }
      const token = User.generateToken(user);
      return res.status(200).json({
        success: true,
        message: 'User logged in',
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    });
  });
};

exports.register = async function (req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    User.create({ name, email, password: hashedPassword }, (err, userId) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      return res.status(201).json({ success: true, message: 'User created' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

