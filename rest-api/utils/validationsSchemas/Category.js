const yup = require("yup");

exports.NewCategorySchema = yup.object({
  categoryName: yup.string('category name must be a string').min(3 , 'category name must be atleast 3 characters long').max(32 , "category name cannot be more than 32 characters").required("Category name is required"),
});

exports.UpdateCategorySchema = yup.object({
    newCategoryName:  yup.string('category name must be a string').min(3 , 'category name must be atleast 3 characters long').max(32 , "category name cannot be more than 32 characters").required("Category name is required"),
});
