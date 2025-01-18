import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
    //add slice
    reducer : {
        cart: cartReducer,
    }
});

export default appStore;