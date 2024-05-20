const router = require("express").Router();
const signalController = require("../controllers/signal.controller");

// Create a new Signal
router.post("/api/signal/learns/new", signalController.create);

// Retrieve a Signal by Device ID and Button ID
router.get("/api/signal/learns/getbyid", signalController.findOne);

module.exports = function (app) {
  app.use(router);
};
