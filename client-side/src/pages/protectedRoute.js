import React, { useContext } from 'react'; 
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '../store/Context';
import { isAuthorized } from '../utils/validations/validateUser';
import NavBar from '../components/NavBar/NavBar';

const ProtectedRoute = () => {

  const [appData] = useContext(AppContext);

    return (
        isAuthorized() ? 
        <>
        <NavBar/>
        <Outlet/>
        </>
        : <Navigate to='/login'/>
    );
}

export default ProtectedRoute;
