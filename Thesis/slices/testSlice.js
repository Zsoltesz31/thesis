import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import MainApiInstance from "../api/api";

const initialState={
    currentAddedTest:null,
    tests:[],
    testById:null,
    loading:false,
    error:null
 }

export const getAllTests = createAsyncThunk('test/getAllTests', ()=>{
    return MainApiInstance.BaseInstance.get(`test`).then((response)=>(response.data))
})

export const getTestsByOwner = createAsyncThunk('test/getTestsByOwner', (id)=>{
    return MainApiInstance.BaseInstance.get(`test/owner/${id}`).then((response)=>(response.data))
})

export const getTestById = createAsyncThunk('test/getTestById', (id)=>{
    return MainApiInstance.BaseInstance.get(`test/${id}`).then((response)=>(response.data))
})


export const deleteTest = createAsyncThunk('test/deleteTest',(id)=>{
    console.log(id)
    return axios.delete(`${BASE_URL}test/${id}`).then((response)=>response.data)
})

export const createTest = createAsyncThunk('test/createTest',(values)=>{
    return axios.post(`${BASE_URL}test`,{
            title:values.title,
            description:values.description,
            ownerId:values.ownerId
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateTest = createAsyncThunk('test/updateTest',(values)=>{
    console.log(values)
   return axios.patch(`${BASE_URL}test/${values.testId}`,{
            title: values.title,
            description: values.description,
            ownerId:values.ownerId
    }).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

const testSlice = createSlice({
    name:'test',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTestsByOwner.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getTestsByOwner.fulfilled,(state,action) => {

            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(getTestsByOwner.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(getAllTests.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getAllTests.fulfilled,(state,action) => {

            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(getAllTests.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(deleteTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(deleteTest.fulfilled,(state,action) => {
            state.loading=false
            state.test=action.payload
            state.error=''
        })
        builder.addCase(deleteTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(createTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(createTest.fulfilled,(state,action) => {
            state.loading=false
            state.currentAddedTest=action.payload
            state.error=''
        })
        builder.addCase(createTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(updateTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(updateTest.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(updateTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(getTestById.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getTestById.fulfilled,(state,action) => {
            state.loading=false
            state.testById=action.payload
            state.error=''
        })
        builder.addCase(getTestById.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        
    }
})

export default testSlice.reducer
