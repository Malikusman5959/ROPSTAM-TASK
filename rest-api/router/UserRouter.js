const express = require("express");
const UserController = require("../controller/UserController");
const UserRouter = express.Router();
const {authorize} = require('../middleware/authMiddleware')

// yup validation imports 
const { validateBody } = require("../utils/validateBody");
const { NewUserSchema } = require("../utils/validationsSchemas/User");
const { ExistingUserSchema } = require("../utils/validationsSchemas/User");

// get all users
UserRouter.get("/" , authorize , UserController.getAllUsers);

UserRouter.post("/register-user" , validateBody(NewUserSchema) , UserController.registerUser);
UserRouter.post("/login" , validateBody(ExistingUserSchema) , UserController.login);

// get stats
UserRouter.get("/get-stats" , authorize , UserController.getStats);

module.exports = UserRouter;



