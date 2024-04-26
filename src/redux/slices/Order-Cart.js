import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:0
}

export const orderCart = createSlice({
        name:'order',
        initialState,
        reducers:{
        orderCartfunction:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {orderCartfunction} = orderCart.actions;
export default orderCart.reducer;