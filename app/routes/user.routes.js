// user.routes.js
const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/api/users/register', userController.register);
router.post('/api/users/login', userController.login);

module.exports = function (app) {
  app.use(router);
};