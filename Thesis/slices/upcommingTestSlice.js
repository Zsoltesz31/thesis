import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    currentAddedUpComingTest:null,
    upComingTests:[],
    loading:false,
    error:null
 }


export const getUpcomingTestByUserId = createAsyncThunk('upcomingtest/getUpcomingTestByUserId', (id)=>{
    return axios.get(`http://192.168.1.64:3333/upcomingtest/${id}`).then((response)=>(response.data))
})

export const addUserToUpcomingTest = createAsyncThunk('upcomingtest/adUsersToUpcomingTests',(values)=>{
    return axios.post(`http://192.168.1.64:3333/upcomingtest/${values.id}`,{
            userIds:values.userIds
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})


export const addTestToUpcomingTests = createAsyncThunk('upcomingtest/createUpComingTest',(values)=>{
    console.log(values)
    return axios.post('http://192.168.1.64:3333/upcomingtest',{
            lastStartDate:values.lastStartDate,
            startDate:values.startDate,
            testId:values.testId
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

const upcommingTestSlice = createSlice({
    name:'upcommingTest',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUpcomingTestByUserId.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getUpcomingTestByUserId.fulfilled,(state,action) => {

            state.loading=false
            state.upComingTests=action.payload
            state.error=''
        })
        builder.addCase(getUpcomingTestByUserId.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(addTestToUpcomingTests.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(addTestToUpcomingTests.fulfilled,(state,action) => {
            state.loading=false
            state.currentAddedUpComingTest=action.payload
            state.error=''
        })
        builder.addCase(addTestToUpcomingTests.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(addUserToUpcomingTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(addUserToUpcomingTest.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(addUserToUpcomingTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        
    }
})

export default upcommingTestSlice.reducer