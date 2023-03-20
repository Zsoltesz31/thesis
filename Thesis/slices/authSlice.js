import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../app/api/userApi";

 const initialState={
    token:null
 }

 const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
         setUser:(state,action) =>{
            console.log(action.payload.username)
            console.log(action.payload.password)
            userLogin({
               email:action.payload.username,
               password:action.payload.password
            }).then((result) => {
               console.log(result)
               if(result.status==200){
                  state.token=result.data.access_token
               }
            }).catch(err=>{
               console.error(err)
            })
         },
         logOut:(state,action) => {
            state.token=null
         }
        }
    },

   
 )

 export const {setUser,logOut} = authSlice.actions

 export default authSlice.reducer

 export const selectCurrentToken = (state) =>state.auth.token