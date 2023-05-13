import axios from "axios";
import { authorizationHeader } from "../../utils/validations/validateUser";

export const fetchStats = async () => {
    let result = await axios.get(`${process.env.REACT_APP_API}/users/get-stats` , authorizationHeader());
    return result.data;
}


