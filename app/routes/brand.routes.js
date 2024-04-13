// brand.routes.js
const router = require('express').Router();
const brandController = require('../controllers/brand.controller');

router.get('/api/brands/getByProtocol', brandController.listbrand);
router.get('/api/brands/getAll', brandController.allbrand);

module.exports = function (app) {
  app.use(router);
};