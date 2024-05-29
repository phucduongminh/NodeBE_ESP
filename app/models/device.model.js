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
  db.query("SELECT * FROM devices WHERE type_id = ? AND user_id = ?", [type_id, user_id], (err, res) => {
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
  });
}

module.exports = Device;
