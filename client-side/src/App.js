import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import background from './assets/images/background.png'
import { AppContext } from "./store/Context.js"
import ProtectedRoute from './pages/protectedRoute';
// toastify
import Toast from './components/Toastify/ToastContr';
import LoadingScreen from './components/LoadingScreen'
// Pages
import LoginPage from './pages/Login';
import Users from './pages/User/viewUsers';
import Signup from './pages/SignUp/SignUp';
import Home from './pages/Home';

import Categories from './pages/Category/viewCategories';
import AddCategory from './pages/Category/addCategory';
import UpdateCategory from './pages/Category/updateCategory';

import Vehicles from './pages/Vehicle/viewVehicles';
import AddVehicle from './pages/Vehicle/addVehicle';
import UpdateVehicle from './pages/Vehicle/updateVehicle';

import PageNotFound from './pages/PageNotFound';


function App() {

  const [appData] = useContext(AppContext);
  
  return (
    <div className="App h-[100vh] w-[100vw] relative flex flex-col justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.5)), url(${background})`}}>
      <Router>
        <>
          <Routes>
            {/* public Routes */}
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<Signup/>} />

            {/* protected routes */}
            <Route element={<ProtectedRoute />} >
              {/* home */}
              <Route exact path="/" element={<Home/>} />
              {/* category routes */}
              <Route exact path="/categories" element={<Categories/>} />
              <Route exact path="/categories/add-category" element={<AddCategory/>} />
              <Route exact path="/categories/update-category/" element={<UpdateCategory/>} />
              {/* vehicle routes */}
              <Route exact path="/vehicles" element={<Vehicles/>} />
              <Route exact path="/vehicles/add-vehicle" element={<AddVehicle/>} />
              <Route exact path="/vehicles/update-vehicle/" element={<UpdateVehicle/>} />
               {/* user routes */}
               <Route exact path="/users" element={<Users/>} />
            </Route>

            {/* undefined routes */}
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </>
      </Router>
      
      {/* Global apps loading state */}
      {appData.loading ? <LoadingScreen/> : null}

      {/* Global toastify wrapper */}
      <Toast />
    </div>
  )
}

export default App;