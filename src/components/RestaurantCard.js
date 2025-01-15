import {CART_IMG} from '../utils/mockdata'

const RestaurantCard = ({resData}) => {
  
  const {
    cloudinaryImageId,
    name,
    avgRating,
    costForTwo,
    cuisines,
  } = resData?.info; 

  return (
    <div className='className="restro-cards hover:scale-90 transition duration-500 m-4 p-4 w-[270px] h-[400px] rounded-lg"'>
        <img className="res-img w-[100%] h-44 rounded-md" alt="res-img" src={CART_IMG + cloudinaryImageId}/>
      <h3 className="font-bold py-1">{name}</h3>
      <span className="text-green-600 font-bold">Rating-{avgRating+"⭐"}</span>
      <span className="font-semibold"> - {costForTwo}</span>
      <h4 className="py-2 text-sm">{cuisines.join(", ")}</h4>
      
    </div>
  )
}

export default RestaurantCard
