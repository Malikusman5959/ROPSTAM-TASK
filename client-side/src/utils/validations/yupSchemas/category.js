const yup = require("yup");

exports.CategorySchema = yup.object({
  categoryName: yup.string('Must be a string').min(3 , 'Must be atleast 3 characters long').max(32 , "Cannot be more than 32 characters").required("Required"),
});
