const Device = require('../models/device.model')

exports.findByUserId = (req,res) => {
    if (!req.query.user_id) {
        return res.status(400).json({
            success: false,
            message: "User ID can not be empty!"
        })
    }

    Device.getDeviceByUserId(req.query.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    success: false,
                    message: `Not found Device with User ID: ${req.query.user_id}.`
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Error retrieving Device with User ID: " + req.query.user_id
                })
            }
        } else {
            return res.status(200).json({
                success: true,
                message: "Device found",
                device: data
            })
        }
    })
}

exports.findByTypeId = (req,res) => {
    if (!req.query.type_id) {
        return res.status(400).json({
            success: false,
            message: "Type ID can not be empty!"
        })
    }

    if (!req.query.user_id) {
        return res.status(400).json({
            success: false,
            message: "User ID can not be empty!"
        })
    }

    Device.getDeviceByTypeId(req.query.type_id, req.query.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    success: false,
                    message: `Not found Device with Type ID: ${req.query.type_id}.`
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Error retrieving Device with Type ID: " + req.query.type_id
                })
            }
        } else {
            return res.status(200).json({
                success: true,
                message: "Device found",
                device: data
            })
        }
    })
}