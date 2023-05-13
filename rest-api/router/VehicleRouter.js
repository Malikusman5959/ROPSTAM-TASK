const express = require("express");
const VehicleController = require("../controller/VehicleController");
const VehicleRouter = express.Router();
const {authorize} = require('../middleware/authMiddleware');
// yup validation imports 
const { validateBody } = require("../utils/validateBody");
const { NewVehicleSchema } = require("../utils/validationsSchemas/Vehicle");
const { UpdateVehicleSchema } = require("../utils/validationsSchemas/Vehicle");

VehicleRouter.get("/" , authorize , VehicleController.getAllVehicles);

VehicleRouter.get("/get-vehicle/:id" , authorize , VehicleController.getVehicle);
VehicleRouter.post("/register-vehicle" , authorize , validateBody(NewVehicleSchema) , VehicleController.createVehicle);
VehicleRouter.patch("/update-vehicle" , authorize , validateBody(UpdateVehicleSchema) , VehicleController.updateVehicle);
VehicleRouter.delete("/delete-vehicle/:id" , authorize , VehicleController.deleteVehicle);

module.exports = VehicleRouter;



