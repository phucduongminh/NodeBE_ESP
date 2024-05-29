const router = require('express').Router();

const deviceController = require('../controllers/device.controller');

router.get('/api/device/getbyid', deviceController.findByUserId);
router.get('/api/device/getbytypeid', deviceController.findByTypeId);

module.exports = function (app) {
    app.use(router);
}