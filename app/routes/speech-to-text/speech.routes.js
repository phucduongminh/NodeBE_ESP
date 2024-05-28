const router = require("express").Router();
const speechController = require("../../controllers/speech-to-text/speech.controller");

router.post("/api/speech/transcribe", speechController.transcribe);

module.exports = function (app) {
  app.use(router);
};
