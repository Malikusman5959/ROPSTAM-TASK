const yup = require("yup");

exports.VehicleSchema = yup.object({
  name: yup.string('Must be a string').min(3 , 'Must be atleast 3 characters long').max(32 , "Cannot be more than 32 characters").required("Required"),
  // type: yup.string('Must be a string').min(24, 'Must be exactly 24 characters').max(24, 'Must be exactly 24 characters').required('Required'),
  model: yup.string('Must be a string').min(3 , 'Must be atleast 3 characters long').max(32 , "Cannot be more than 32 characters").required("Required"),
  color: yup.string('Must be a string').min(3 , 'Must be atleast 3 characters long').max(32 , "Cannot be more than 32 characters").required("Required"),
  regNo: yup.string('Must be a string').min(5 , 'Must be atleast 5 characters long').max(7 , "Cannot be more than 7 characters").required("Required"),
});
