import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import BaseInstance from "../api/api";

const initialState={
    users:[],
    loading:false,
    error:null
 }

export const getAllUsers = createAsyncThunk('users/getAllUsers', ()=>{
    return BaseInstance.get(`users`).then((response)=>(response.data))
})


const usersSlice = createSlice({
    name:'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getAllUsers.fulfilled,(state,action) => {
            state.loading=false
            state.users=action.payload
            state.error=''
        })
        builder.addCase(getAllUsers.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        
    }
})

export default usersSlice.reducer
