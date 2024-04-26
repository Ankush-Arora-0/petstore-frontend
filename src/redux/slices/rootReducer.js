import { combineReducers } from "@reduxjs/toolkit";
import CheckLogin from "./CheckLogin";
import  userdata from "./userData";
import  orderCart  from "./Order-Cart";
import  categoryOfPet  from "./categoryPet";

 const rootReducer = combineReducers({
    CheckLogin,
    userdata,
    orderCart,
    categoryOfPet
})

export default rootReducer;