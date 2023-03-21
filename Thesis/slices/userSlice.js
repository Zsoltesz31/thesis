import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../app/api/userApi";

 const initialState={
  user:{},
  isLoading:false,
  registerSucces:false
 }

 


 const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
      setUser:(state,action) => {
         state.user=action.payload
      }
        },
        
     
    },

   
 )

 export const {setUser,logOut} = userSlice.actions

 export default userSlice.reducer