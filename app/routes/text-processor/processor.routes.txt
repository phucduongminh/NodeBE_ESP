const router = require('express').Router();
const textProcessController = require('../controllers/text-processor/processor.controller');

router.post('/api/voice/process', textProcessController.process);

module.exports = function (app) {
  app.use(router);
};