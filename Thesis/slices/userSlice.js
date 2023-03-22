import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

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