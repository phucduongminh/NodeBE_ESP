const db = require("../common/connect");
const Ir_Signal = function (ir_signal) {
  this.id = ir_signal.id;
  this.button_id = ir_signal.button_id;
  this.device_id = ir_signal.device_id;
  this.rawdata_length = ir_signal.rawdata_length;
  this.rawdata = ir_signal.rawdata;
  this.state_length = ir_signal.state_length;
  this.state = ir_signal.state;
};

Ir_Signal.createNewData = function (newIrSignal, result) {
  db.query("INSERT INTO ir_data SET ?", newIrSignal, (err, res) => {
    if (err) {
      console.error(err);
      result(err, null);
      return;
    }
    console.log("Created ir_signal: ", { id: res.insertId, ...newIrSignal });
    result(null, { id: res.insertId, ...newIrSignal });
  });
};

Ir_Signal.getByDeviceAndButtonId = function (device_id, button_id, result) {
  db.query(
    "SELECT * FROM ir_data WHERE device_id = ? AND button_id = ?",
    [device_id, button_id],
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found ir_signal: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Ir_Signal.getByUserIdAndTypeId = function (user_id, type_id, button_id, ordinal, result) {
  db.query(
    "SELECT ir_data.device_id, rawdata_length, rawdata, state_length, state FROM ir_data LEFT JOIN devices " +
      "ON ir_data.device_id = devices.device_id " +
      "WHERE devices.user_id = ? AND devices.type_id = ? AND ir_data.button_id = ? "+ 
      "ORDER BY ir_data.device_id",
    [user_id, type_id, button_id],
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
        return;
      }
      if (res.length && res.length >= ordinal && ordinal > 0) {
        console.log("Found ir_signal: ", res[ordinal-1]);
        result(null, res[ordinal-1]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Ir_Signal;
