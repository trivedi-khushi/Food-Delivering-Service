import React from 'react'
import RestaurantCard from './RestaurantCard'
import { useState, useEffect } from 'react'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'

const Body = () => {

  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const data = await fetch("https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D12.9351929%26lng%3D77.62448069999999%26page_type%3DDESKTOP_WEB_LISTING%26limit%3D20");
      const json = await data.json();
      const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      
      if (restaurants) {
        setListOfRestaurant(restaurants);
        setFiltered(restaurants);
      } else {
        console.error("No restaurants data found in API response.");
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };
  

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return <div className='flex m-4 p-4'>LOOKS LIKE YOU ARE OFFLINE!! PLEASE CHECK YOUR INTERNET CONNECTION</div>


  return listOfRestaurant.length === 0 ? <Shimmer /> : (
    <div className='body'>
        <div className='filter flex'>           
        <div className='search m-4 p-4'>
        <input type='text' className='border border-solid border-black' value={searchText} onChange={(e)=>{
           setSearchText(e.target.value);
          }}/>
          <button className='px-4 py-2 bg-green-300 m-4 rounded-full' onClick={()=>{
            const filteredRes = listOfRestaurant.filter((res)=>
            res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFiltered(filteredRes)
            }}>Search</button>
        </div>

        <div className='search m-4 p-4 flex items-center'>
          <button className='px-4 py-2 bg-green-300 rounded-full' onClick={()=>{
                const filteredList = listOfRestaurant.filter(
                (res)=>res.info.avgRating > 4);
              setFiltered (filteredList);
          }}> 4.0+ Rating </button>
        </div>
          
        <div className='m-4 p-4 flex items-center'>
          <button className='px-4 py-2 bg-green-300 rounded-full' onClick={()=>{
                const filteredList = listOfRestaurant.filter(
                  (res)=>res.info.veg === true);
                  setFiltered (filteredList);
          }}>Veg</button>
        </div>

       </div>

        <div className='flex flex-wrap'>
        {filtered.map((i) => (
        <Link key={i.info.id} to = {"/restaurants/" + i.info.id}><RestaurantCard resData={i} /></Link>
        ))}
        </div>
      
    </div>
  )
}

export default Body
