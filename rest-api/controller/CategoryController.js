const Category = require("../model/Category");
const Vehicle = require("../model/Vehicle");


exports.getAllCategories = async function (req, res) {

    Category.find()
        .then((result) => {
            res.status(200).json({
                Success: "Categories Fetched Successfully!",
                Categories: result
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "Failed",
                message: err,
            });
        })
};


exports.createCategory = async function (req, res) {
    try {
        // fields are already validated through a middleware in the router
        const { categoryName } = req.body

        // check if the category already exists
        let categoryExists = await Category.findOne({ name: categoryName });
        if (categoryExists) {
            return res.status(405).json({
                status: "Failed",
                message: "Category already exists"
            });
        }

        // generate a new category record
        var category = new Category(
            {
                name: categoryName
            }
        );
        category.save(function (err, newCategory) {
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
                    message: "Category Registered successfully",
                    data: {
                        category: {
                            _id: newCategory._id,
                            name: newCategory.name,
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


exports.getCategory = async function (req, res) {
    Category.findById(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    Success: "Category Fetched Successfully!",
                    Category: result
                });
            }
            else {
                res.status(400).json({
                    status: "Failed",
                    message: "No such category found",
                });
            }
        })
        .catch((err) => {
            res.status(400).json({
                status: "Failed",
                message: "No such category found",
            });
        })
};


exports.updateCategory = async function (req, res) {
    try {
        // Checking first if category exists in database
        let category = await Category.findById(req.body.categoryId);

        // if found, then update
        if (category) {
            let result = await Category.findByIdAndUpdate(req.body.categoryId, { name: req.body.newCategoryName }, { new: true });
            if (result) {
                res.status(200).json({
                    status: "Updated",
                    message: "Category Updated Successfully!",
                    UpdatedCategory: result
                });
            }
            // if fails
            else {
                res.status(400).json({
                    status: "Failed",
                    message: "Category Failed to Update!",
                });
            }
        }
        // if not found
        else {
            res.status(405).json({
                status: "Failed",
                message: "No such category found in database"
            });
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed Request",
            message: e,
        });
    }
};


exports.deleteCategory = async function (req, res) {
    try {
        // Checking first if category exists in database
        let category = await Category.findById(req.params.id);

        // if found, then delete
        if (category) {
            Category.findByIdAndDelete(req.params.id)
                .then(()=>{
                     // fetch and delete all the vehicles having the deleted category
                     return Vehicle.deleteMany({type : req.params.id})
                })
                .then(()=>{
                    res.status(200).json({
                        status: "Deleted",
                        message: "Category Deleted Successfully!",
                    });
                 })
                .catch((err) => {
                    res.status(400).json({
                        status: "Failed",
                        message: "Category Failed to Delete!",
                        error: err
                    });
                })
        }
        // if not found
        else {
            res.status(305).json({
                status: "Failed",
                message: "No such category found in database"
            });
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed Request",
            message: e,
        });
    }
};