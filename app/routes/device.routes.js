const router = require('express').Router();

const deviceController = require('../controllers/device.controller');

//Get by UserId
router.get('/api/device/getbyid', deviceController.findByUserId);
//Get by TypeId
router.get('/api/device/getbytypeid', deviceController.findByTypeId);
router.get('/api/device/gettype', deviceController.findType);
router.get('/api/device/getalltype', deviceController.getAllTypes);
router.post('/api/device/add', deviceController.create);
router.get('/api/device/checkdeviceid', deviceController.checkDeviceIdFromIRData);
// router.put('/api/device/update', deviceController.update);
// router.delete('/api/device/delete', deviceController.delete);
//Get Protocol by Id
router.get('/api/device/getprotocolbyid', deviceController.getProtocol);
//Update Protocol
router.put('/api/device/updateprotocol', deviceController.updateProtocol);

module.exports = function (app) {
    app.use(router);
}