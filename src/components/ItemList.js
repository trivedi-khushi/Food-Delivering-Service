import { useDispatch } from "react-redux";
import {CART_IMG} from "../utils/mockdata";
import { addItems } from "../utils/cartSlice";

const ItemList = ({ items }) => {

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //Dispatch an Action
    dispatch(addItems(item));
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between">
          <div className="w-9/12">
            <div className="py-2 font-semibold">
                <span>{item.card.info.name}</span>
                <span>
                - ₹{item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
            </div>
            <p className="text-xs text-gray-600">{item.card.info.description}</p>
          </div>
            <div className="w-2/12">
            <div className="absolute ">
                <button className="p-1 mx-9 bg-white shadow-lg text-green-400 border-2 rounded-lg "
                onClick={()=>handleAddItem(item)}>
                Add</button>
            </div>
            <img className="w-full" src={CART_IMG + item.card.info.imageId} />
            </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
