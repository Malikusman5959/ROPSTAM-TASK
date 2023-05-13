const yup = require("yup");

exports.NewVehicleSchema = yup.object({
  name: yup.string('vehicle name must be a string').min(3 , 'vehicle name must be atleast 3 characters long').max(32 , "vehicle name cannot be more than 32 characters").required("Vehicle name is required"),
  type: yup.string('category id must be a string').min(24, 'category id (type) must be exactly 24 characters').max(24, 'category id (type) must be exactly 24 characters').required('category id (type) is required'),
  model: yup.string('model must be a string').min(3 , 'model must be atleast 3 characters long').max(32 , "model cannot be more than 32 characters").required("model is required"),
  color: yup.string('color must be a string').min(3 , 'color must be atleast 3 characters long').max(32 , "color cannot be more than 32 characters").required("color is required"),
  regNo: yup.string('regNo must be a string').min(5 , 'regNo must be atleast 5 characters long').max(7 , "regNo cannot be more than 7 characters").required("regNo is required"),
});

exports.UpdateVehicleSchema = yup.object({
    vehicleId: yup.string('vehicle id must be a string').min(24, 'vehicle id must be exactly 24 characters').max(24, 'vehicle id must be exactly 24 characters'),
    name: yup.string('vehicle name must be a string').min(3 , 'vehicle name must be atleast 3 characters long').max(32 , "vehicle name cannot be more than 32 characters"),
    type: yup.string('category id must be a string').min(24, 'category id must be exactly 24 characters').max(24, 'category id must be exactly 24 characters'),
    model: yup.string('model must be a string').min(3 , 'model must be atleast 3 characters long').max(32 , "model cannot be more than 32 characters"),
    color: yup.string('color must be a string').min(3 , 'color must be atleast 3 characters long').max(32 , "color cannot be more than 32 characters"),
    regNo: yup.string('regNo must be a string').min(5 , 'regNo must be atleast 5 characters long').max(7 , "regNo cannot be more than 7 characters"),
});