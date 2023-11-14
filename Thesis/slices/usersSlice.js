import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import BaseInstance from "../api/api";

const initialState={
    users:[],
    loading:false,
    error:null
 }

export const getAllUsers = createAsyncThunk('users/getAllUsers', ()=>{
    return BaseInstance.get(`users/students`).then((response)=>(response.data)).catch(e=>{console.log(e)})
})

export const forgotPassword = createAsyncThunk('users/forgotPassword', (email)=>{
    console.log(email)
    return BaseInstance.post(`auth/forgot-password`,{email}).then((response)=>(response.data)).catch(e=>{console.log(e.message)})
})

export const changePassword = createAsyncThunk('users/changePassword', (values)=>{
    console.log('HALÓ:',values)
    return BaseInstance.post(`auth/change-password`,{
        password:values.password,
        token:values.token
    }).then((response)=>(response.data)).catch(e=>{console.log(e)})
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
            Object.assign(state.users, action.payload)
            state.error=''
        })
        builder.addCase(getAllUsers.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(forgotPassword.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(forgotPassword.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(forgotPassword.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(changePassword.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(changePassword.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(changePassword.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        
    }
})

export default usersSlice.reducer
