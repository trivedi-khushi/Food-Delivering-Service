import ItemList from "./ItemList";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const RestaurantCategory = ({data}) => {

    const [showItems, setShowItems] = useState(true);

    const handleClick =()=>{
        setShowItems(!showItems);
    }

  return (
    <>
    <div>
      {/*Header*/}
      <div className="w-6/12 mx-auto my-4 bg-white shadow-2xl p-4">
        <div className="flex justify-between cursor-pointer items-center" onClick={handleClick}> 
          <span className="font-bold text-lg text-black">
            {data.title} ({data.itemCards.length})
          </span>
          {showItems ? <IoIosArrowUp/> : <IoIosArrowDown/>}
        </div>
        {/*Accordion Body*/}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
    </>
  );
};

export default RestaurantCategory;
