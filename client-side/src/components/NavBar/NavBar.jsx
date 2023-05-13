import React from 'react'
import logo from './../../assets/images/logo.png'
import Homeicon from './../../assets/icons/homeIcon'
import { useNavigate } from 'react-router-dom'

function NavBar() {

  let navigate = useNavigate();

  // logout
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='mycard absolute top-0 text-[#fff] m-4 p-4 w-[98%] h-[70px] rounded-xl flex flex-row justify-between items-center'>
      <span className='flex flex-row justify-between items-center'>
        <span className='w-[30px] h-[30px] rounded-[50%] bg-[#1e3a8a]'></span>
        <p className='text-lg font-black ml-2' > ROPSTAM TASK </p>
      </span>
     <span className='flex flex-row justify-between items-center'>
     <Homeicon onClick={()=>{navigate('/')}} width={50}/>
     <button onClick={logout} className='mybtn'>Logout </button>
     </span>
    </div>
  )
}

export default NavBar