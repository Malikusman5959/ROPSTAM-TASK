import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { fetchStats } from "./fetchApi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/Context";

function Home() {

  const [stats, setstats] = useState({vehicles : 0 , categories : 0 , users : 0});
  let navigate = useNavigate();
  const [appData , dispatch] = useContext(AppContext)

  // get stats 
  const getStats = async () => {
    // start loading
    dispatch({ type: 'loading', payload: true });
    let result = await fetchStats();
    // stop loading
    dispatch({ type: 'loading', payload: false });
    if (result.stats)
      setstats(result.stats)
  }

  useEffect(() => {
    getStats();
  }, [])
  
  return (
    <div className="h-full w-full flex flex-col items-center">

      {/* header */}
      <h1 className="text-white uppercase tracking-wider text-4xl mt-32 font-black"> Dashboard </h1>

      <div className="w-full h-[70%] max-w-[1500px] flex flex-col justify-around items-center lg:flex-row">
        {/* vehicles */}
        <div className="w-[350px] rounded-lg p-4 text-center font-bold tracking-wider mycard">
          <h2 className="text-orange-500 text-2xl my-2"> Vehicles </h2>
          <p className="text-white text-8xl"> {stats.vehicles} </p>
          <button onClick={()=>{navigate('/vehicles')}} className="mybtn my-2"> View </button>
        </div>

        {/* categories */}
        <div className="w-[350px] rounded-lg p-4 text-center font-bold tracking-wider mycard">
          <h2 className="text-orange-500 text-2xl my-2"> Categories </h2>
          <p className="text-white text-8xl"> {stats.categories} </p>
          <button onClick={()=>{navigate('/categories')}} className="mybtn my-2"> View </button>
        </div>

        {/* users */}
        <div className="w-[350px] rounded-lg p-4 text-center font-bold tracking-wider mycard">
          <h2 className="text-orange-500 text-2xl my-2"> Users </h2>
          <p className="text-white text-8xl"> {stats.users} </p>
          <button onClick={()=>{navigate('/users')}} className="mybtn my-2"> View </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
