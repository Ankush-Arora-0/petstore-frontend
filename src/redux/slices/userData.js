import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const userdata = createSlice({
    name:'userdata',
    initialState,
    reducers:{
        userData:(state,action)=>{
            return {...action.payload}
        }
    }
})

export const {userData} = userdata.actions;
export default userdata.reducer;