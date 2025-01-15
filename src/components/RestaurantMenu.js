import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import fssai from "../assets/fssai.png";
import { FaLocationDot } from "react-icons/fa6";

const RestaurantMenu = () => {

  const { resId } = useParams();
  
  const resInfo = useRestaurantMenu(resId); //CUSTOM HOOK CREATED FOR FETCHING THE DATA

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;


  /* Filtering only Item Categories */
  const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c)=>c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  const footerInfo = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c)=>c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
  );
  const footerAddress = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c)=>c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
  );
  console.log(footerAddress);
  /* ============================== */

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category)=> <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card} />)}
      
    <div className="bg-[rgb(241,241,246)] w-6/12 mx-auto my-4 p-4">
      <div className=" flex justify-start items-center">
        <img className="w-16" src={fssai} alt="fssai" />
        <p className="text-gray-400 ml-4">{footerInfo[0].card?.card?.text}</p>
      </div>
      <p className=" border-t border-gray-400 mt-4"></p>
      <div className="text-start mt-4 mb-24">
        <p className="text-gray-400 font-bold">{footerAddress[0].card?.card?.name}</p>
        <p className="text-gray-400">(Outlet:{footerAddress[0].card?.card?.area})</p>
        <p className="text-gray-400 flex mt-2"><FaLocationDot className="mr-2 mt-1"/>{footerAddress[0].card?.card?.completeAddress}</p>
      </div>
    </div>
    </div>
  );
};

export default RestaurantMenu;
