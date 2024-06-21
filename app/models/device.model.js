const db = require("../common/connect");

const Device = function (device) {
  this.device_id = device.device_id;
  this.device_name = device.device_name;
  this.type_id = device.type_id;
  this.Protocol = device.Protocol;
  this.user_id = device.user_id;
};

Device.getDeviceByUserId = function (user_id, result) {
  db.query(
    "SELECT devices.*, device_types.type FROM devices LEFT JOIN device_types " +
      "ON devices.type_id = device_types.type_id WHERE devices.user_id = ?",
    user_id,
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found device!");
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Device.getDeviceByTypeId = function (type_id, user_id, result) {
  db.query(
    "SELECT device_id, device_name, Protocol FROM devices WHERE type_id = ? AND user_id = ?",
    [type_id, user_id],
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found device!");
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Device.getTypeByUserId = function (user_id, result) {
  db.query(
    "SELECT DISTINCT devices.type_id, device_types.type FROM devices LEFT JOIN device_types " +
      "ON devices.type_id = device_types.type_id WHERE devices.user_id = ? ORDER BY devices.type_id",
    user_id,
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found device types!");
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Device.getAllTypes = function (result) {
  db.query("SELECT * FROM device_types", (err, res) => {
    if (err) {
      console.error(err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found all device types!");
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Device.addDevice = function (newDevice, result) {
  db.query("INSERT INTO devices SET ?", newDevice, (err, res) => {
    if (err) {
      console.error(err);
      result(err, null);
      return;
    }
    console.log("Created device: ", { id: res.insertId, ...newDevice });
    result(null, { id: res.insertId, ...newDevice });
  });
};

Device.checkDeviceId = function (device_id, result) {
  db.query(
    "SELECT * FROM devices WHERE device_id = ?",
    [device_id], // Ensure device_id is passed as an array
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found device with ID: ", device_id);
        result(null, true); // Device exists
        return;
      }
      result(null, false); // Device does not exist
    }
  );
};

Device.checkDeviceIdFromIRData = function (device_id, result) {
  db.query(
    "SELECT * FROM ir_data WHERE device_id = ?",
    [device_id], // Ensure device_id is passed as an array
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found device with ID: ", device_id);
        result(null, true); // Device exists
        return;
      }
      result(null, false); // Device does not exist
    }
  );
};

Device.getProtocolById = function (device_id, result) {
  db.query(
    "SELECT Protocol FROM devices WHERE device_id = ?",
    [device_id], // Ensure device_id is passed as an array
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]); // Device exists
        return;
      }
      result({ kind: "not_found" }, null); // Device does not exist
    }
  );
};

module.exports = Device;
