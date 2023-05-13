import axios from 'axios'
import { authorizationHeader } from '../../utils/validations/validateUser';

// get all users
export const fetchAllUsers = async () => {
    let result = await axios.get(`${process.env.REACT_APP_API}/users` , authorizationHeader());
    return result.data.Users;
}