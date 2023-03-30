import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    currentAddedTest:null,
    tests:[],
    loading:false,
    error:null
 }

export const getAllTests = createAsyncThunk('test/getAllTests', ()=>{
    return axios.get('http://192.168.1.64:3333/test').then((response)=>(response.data))
})


export const deleteTest = createAsyncThunk('test/deleteTest',(id)=>{
    console.log(id)
    return axios.delete(`http://192.168.1.64:3333/test/${id}`).then((response)=>response.data)
})

export const createTest = createAsyncThunk('test/createTest',(values)=>{
    return axios.post('http://192.168.1.64:3333/test',{
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
   return axios.patch(`http://192.168.1.64:3333/test/${values.testId}`,{
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
        
    }
})

export default testSlice.reducer
