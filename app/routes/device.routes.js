const router = require('express').Router();

const deviceController = require('../controllers/device.controller');

router.get('/api/device/getbyid', deviceController.findByUserId);
router.get('/api/device/getbytypeid', deviceController.findByTypeId);
router.get('/api/device/gettype', deviceController.findType);
router.get('/api/device/getalltype', deviceController.getAllTypes);
router.post('/api/device/add', deviceController.create);
router.get('/api/device/checkdeviceid', deviceController.checkDeviceIdFromIRData);
// router.put('/api/device/update', deviceController.update);
// router.delete('/api/device/delete', deviceController.delete);


module.exports = function (app) {
    app.use(router);
}