import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value:0
};

export const chklogin = createSlice({
    name:'chklogin',
    initialState,
    reducers:{
        chkLogin:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const {chkLogin} = chklogin.actions;
export default chklogin.reducer;