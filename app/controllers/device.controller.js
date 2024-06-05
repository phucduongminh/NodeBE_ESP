const Device = require("../models/device.model");

exports.findByUserId = (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).json({
      success: false,
      message: "User ID can not be empty!",
    });
  }

  Device.getDeviceByUserId(req.query.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          success: false,
          message: `Not found Device with User ID: ${req.query.user_id}.`,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Error retrieving Device with User ID: " + req.query.user_id,
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Device found",
        device: data,
      });
    }
  });
};

exports.findByTypeId = (req, res) => {
  if (!req.query.type_id) {
    return res.status(400).json({
      success: false,
      message: "Type ID can not be empty!",
    });
  }

  if (!req.query.user_id) {
    return res.status(400).json({
      success: false,
      message: "User ID can not be empty!",
    });
  }

  Device.getDeviceByTypeId(
    req.query.type_id,
    req.query.user_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).json({
            success: false,
            message: `Not found Device with Type ID: ${req.query.type_id}.`,
          });
        } else {
          return res.status(500).json({
            success: false,
            message:
              "Error retrieving Device with Type ID: " + req.query.type_id,
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          message: "Device found",
          device: data,
        });
      }
    }
  );
};

exports.findType = (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).json({
      success: false,
      message: "User ID can not be empty!",
    });
  }

  Device.getTypeByUserId(req.query.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          success: false,
          message: `No device types found for user with ID: ${req.query.user_id}.`,
        });
      } else {
        return res.status(500).json({
          success: false,
          message:
            "Error retrieving device types for user with ID: " +
            req.query.user_id,
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Device types found",
        types: data,
      });
    }
  });
};

exports.getAllTypes = (req, res) => {
  Device.getAllTypes((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          success: false,
          message: "No device types found.",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Error retrieving device types.",
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Device types found",
        types: data,
      });
    }
  });
};

async function generateDeviceId(user_id, type_id) {
  const prefix = `dv-u${user_id}-t${type_id}`;
  let suffix = 1;

  while (true) {
    const deviceId = `${prefix}-${suffix}`;
    try {
      const exists = await new Promise((resolve, reject) => {
        Device.checkDeviceId(deviceId, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
      if (!exists) {
        return deviceId;
      }
    } catch (err) {
      console.error("Error checking device ID:", err);
      throw err; // Re-throw the error to handle it in the caller
    }
    suffix++;
  }
}

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.device_name) {
    return res.status(400).json({
      success: false,
      message: "Device name are required!",
    });
  }

  // Generate device ID
  const device_id = await generateDeviceId(req.body.user_id, req.body.type_id);
  console.log(device_id);

  // Create a new device object
  const newDevice = new Device({
    device_id: device_id,
    device_name: req.body.device_name,
    type_id: req.body.type_id,
    Protocol: req.body.Protocol || null,
    user_id: req.body.user_id,
  });

  // Call the Device.addDevice method to insert the new device
  Device.addDevice(newDevice, (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message:
          err.message || "Some error occurred while creating the device.",
      });
    } else {
      // Add the generated device_id to the response

      return res.status(200).json({
        success: true,
        message: "Device created successfully!",
        device_id,
      });
    }
  });
};
