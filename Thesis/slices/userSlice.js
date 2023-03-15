import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

 const initialState={
    user:{
        firstName:'',
        lastName:'',
        email:'',
        password:''
    }
 }


//Reducers

 const userSlice = createSlice({
    name:'register',
    initialState,
    reducers:{
        createUser:(state,action)=>{
           state.user.firstName=action.payload.firstName
           state.user.lastName=action.payload.lastName
           state.user.email=action.payload.email
           state.user.password=action.payload.password
           console.log(state.user)
        }
    },

   
 })

 export const {createUser} = userSlice.actions

 export default userSlice.reducer