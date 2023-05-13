const express = require("express");
const CategoryController = require("../controller/CategoryController");
const CategoryRouter = express.Router();
const {authorize} = require('../middleware/authMiddleware');
// yup validation imports 
const { validateBody } = require("../utils/validateBody");
const { NewCategorySchema } = require("../utils/validationsSchemas/Category");
const { UpdateCategorySchema } = require("../utils/validationsSchemas/Category");

CategoryRouter.get("/" , authorize , CategoryController.getAllCategories);

CategoryRouter.get("/get-category/:id" , authorize , CategoryController.getCategory);
CategoryRouter.post("/register-category" , authorize , validateBody(NewCategorySchema) , CategoryController.createCategory);
CategoryRouter.patch("/update-category" , authorize , validateBody(UpdateCategorySchema) , CategoryController.updateCategory);
CategoryRouter.delete("/delete-category/:id" , authorize , CategoryController.deleteCategory);

module.exports = CategoryRouter;



