const Vehicle = require("../model/Vehicle");
const Category = require("../model/Category");


exports.getAllVehicles = async function (req, res) {

    Vehicle.find().populate('type')
        .then((result) => {
            res.status(200).json({
                Success: "Vehicles Fetched Successfully!",
                Vehicles: result
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "Failed",
                message: err,
            });
        })
};


exports.createVehicle = async function (req, res) {

    try {
        // fields are already validated through a middleware in the router
        const vehicleInfo = req.body

        // check if the vehicle already exists
        let vehicleExists = await Vehicle.findOne({ name: vehicleInfo.name });
        if (vehicleExists) {
            return res.status(405).json({
                status: "Failed",
                message: "Vehicle already exists"
            });
        }

        // check if the category id is valid and such category exists in database
        let categoryExists = await Category.findById(vehicleInfo.type);
        if (!categoryExists) {
            return res.status(406).json({
                status: "Failed",
                message: "No such category id (type) exist "
            });
        }

        // generate a new vehicle record
        var vehicle = new Vehicle(vehicleInfo);
        vehicle.save(function (err, newVehicle) {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    err: err
                });
            }
            else {
                //success message
                return res.status(200).json({
                    status: 'success',
                    message: "Vehicle Registered successfully",
                    data: {
                        vehicle: {
                            ...newVehicle._doc
                        },
                    },
                });
            }
        });

    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e,
        });
    }
};


exports.getVehicle = async function (req, res) {
    Vehicle.findById(req.params.id).populate('type')
        .then((result) => {
            if (result) {
                res.status(200).json({
                    status: "Success",
                    message: "Vehicle Fetched Successfully!",
                    Vehicle: result
                });
            }
            else {
                res.status(400).json({
                    status: "Failed",
                    message: "No such vehicle found",
                });
            }
        })
        .catch((err) => {
            res.status(400).json({
                status: "Failed",
                message: "No such vehicle found",
            });
        })
};



exports.updateVehicle = async function (req, res) {
    try {
        // Checking first if vehicle exists in database
        let vehicle = await Vehicle.findById(req.body.vehicleId);

        // if found, then update
        if (vehicle) {
            let result = await Vehicle.findByIdAndUpdate(req.body.vehicleId, req.body, { new: true });
            if (result) {
                res.status(200).json({
                    status: "Updated",
                    message: "Vehicle Updated Successfully!",
                    UpdatedVehicle: result
                });
            }
            // if fails
            else {
                res.status(400).json({
                    status: "Failed",
                    message: "Vehicle Failed to Update!",
                });
            }
        }
        // if not found
        else {
            res.status(305).json({
                status: "Failed",
                message: "No such vehicle found in database"
            });
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed Request",
            message: e,
        });
    }
};


exports.deleteVehicle = async function (req, res) {
    try {

        let id = req.params.id;
        // Checking first if vehicle exists in database
        let vehicle = await Vehicle.findById(id);

        // if found, then delete
        if (vehicle) {
            Vehicle.findByIdAndDelete(id)
                .then((result) => {
                    res.status(200).json({
                        status: "Deleted",
                        message: "Vehicle Deleted Successfully!",
                        DeletedVehicle: result
                    });
                }).catch((err) => {
                    res.status(400).json({
                        status: "Failed",
                        message: "Vehicle Failed to Update!",
                        error: err
                    });
                })
        }
        // if not found
        else {
            res.status(305).json({
                status: "Failed",
                message: "No such vehicle found in database"
            });
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed Request",
            message: e,
        });
    }
};