import axios from 'axios'
import { authorizationHeader } from '../../utils/validations/validateUser';

// get all categories
export const fetchAllCategories = async () => {
    let result = await axios.get(`${process.env.REACT_APP_API}/categories` , authorizationHeader());
    return result.data.Categories;
}

// get category
export const fetchCategory = async (id) => {
    let result = await axios.get(`${process.env.REACT_APP_API}/categories/get-category/${id}`, authorizationHeader());
    return result;
}

// add category
export const registerCategory = async (category) => {
    let result = await axios.post(`${process.env.REACT_APP_API}/categories/register-category` , category, authorizationHeader());
    return result;
}

// delete category
export const deleteCategory = async (id) => {
    let result = await axios.delete(`${process.env.REACT_APP_API}/categories/delete-category/${id}`, authorizationHeader());
    return result;
}

// update category
export const updateCategory = async (categoryId , newCategoryName) => {
    let result = await axios.patch(`${process.env.REACT_APP_API}/categories/update-category/` , {categoryId , newCategoryName}, authorizationHeader());
    return result;
}
