const Ir_signal = require("../models/signal.model.js");

// Create and Save a new Signal
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.button_id ||
    !req.body.device_id ||
    !req.body.rawdata_length ||
    !req.body.rawdata
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Insert Data Field can not be empty (except Status)!",
      });
  }

  // Create a Signal
  const signal = new Ir_signal({
    button_id: req.body.button_id,
    device_id: req.body.device_id,
    rawdata_length: req.body.rawdata_length,
    rawdata: req.body.rawdata,
    state_length: req.body.state_length,
    state: req.body.state,
  });

  // Save Signal in the database
  Ir_signal.createNewData(signal, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            err.message || "Some error occurred while creating the Signal.",
        });
    } else {
      return res.status(200).json({
        success: true,
        message: "Signal Created",
        signal: {
          button_id: data.button_id,
          device_id: data.device_id,
        },
      });
    }
  });
};

// Retrieve a Signal by Device ID and Button ID
exports.findOne = (req, res) => {
  if (!req.query.device_id || !req.query.button_id) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Button ID and Device ID can not be empty!",
      });
  }
  Ir_signal.getByDeviceAndButtonId(
    req.query.device_id,
    req.query.button_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res
            .status(404)
            .json({
              success: false,
              message: `Not found Signal with Device ID ${req.query.device_id} and Button ID ${req.query.button_id}.`,
            });
        } else {
          return res
            .status(500)
            .json({
              success: false,
              message: `Error retrieving Signal with Device ID ${req.query.device_id} and Button ID ${req.query.button_id}.`,
            });
        }
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Signal Found", signal: data });
      }
    }
  );
};
