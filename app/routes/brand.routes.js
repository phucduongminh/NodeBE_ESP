// brand.routes.js
const router = require('express').Router();
const brandController = require('../controllers/brand.controller');

router.get('/api/brands/getlist', brandController.listbrand);

module.exports = function (app) {
  app.use(router);
};