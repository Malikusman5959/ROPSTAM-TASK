import axios from 'axios'
import { authorizationHeader } from '../../utils/validations/validateUser';

// get all vehicles
export const fetchAllVehicles = async () => {
    let result = await axios.get(`${process.env.REACT_APP_API}/vehicles` , authorizationHeader());
    return result.data.Vehicles;
}

// get vehicle
export const fetchVehicle = async (id) => {
    let result = await axios.get(`${process.env.REACT_APP_API}/vehicles/get-vehicle/${id}`, authorizationHeader());
    return result;
}

// add vehicle
export const registerVehicle = async (vehicle) => {
    let result = await axios.post(`${process.env.REACT_APP_API}/vehicles/register-vehicle` , vehicle, authorizationHeader());
    return result;
}

// delete vehicle
export const deleteVehicle = async (id) => {
    let result = await axios.delete(`${process.env.REACT_APP_API}/vehicles/delete-vehicle/${id}`, authorizationHeader());
    return result;
}

// update vehicle
export const updateVehicle = async (vehicleId , data) => {
    let result = await axios.patch(`${process.env.REACT_APP_API}/vehicles/update-vehicle/` , {vehicleId , ...data}, authorizationHeader());
    return result;
}
