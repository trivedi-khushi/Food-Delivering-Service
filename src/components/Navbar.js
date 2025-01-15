import React from 'react'
import images from '../utils/images'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const [btnToggle, setButtonToggle] = useState("Login")

  const onlineStatus = useOnlineStatus();

  //REDUX-WORK
  const cartItem = useSelector((state)=>(state.cart.items));
  //console.log(cartItem);
  //==========

  return (
    <div className='flex justify-between bg-white shadow-lg'>
      <div className='app_navbar_logo'>
        <img className='w-20 ml-4' src={images.logo} alt="app_logo"/>
      </div>
      <div className='flex items-center'>
        <ul className='flex p-4 m-4'>
            <li className='px-4'>
              Online Status: {onlineStatus ? "✅" : "🔴"}
            </li>
            <li className='px-4 flex'>
              <Link to='/'>Home</Link>
            </li>
            <li className='px-4'>
              <Link to='/cart'>Cart({cartItem.length})</Link>
            </li>
            <button className='login px-4' onClick={()=>{
              btnToggle === "Login" 
              ? setButtonToggle("Logout") 
              : setButtonToggle("Login");
            }}>{btnToggle}</button>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
