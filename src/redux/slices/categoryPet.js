import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value:""
}

export const categoryOfPet = createSlice({
    name:'category',
    initialState,
    reducers:{
        petcategory:(state,action)=>{
            state.value=action.payload
        }
    }
})
export const {petcategory} = categoryOfPet.actions;
export default categoryOfPet.reducer