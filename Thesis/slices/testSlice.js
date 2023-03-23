import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getAllTests = createAsyncThunk('test/getAllTests',()=>{
    axios.get('http://192.168.1.66:3333/test').then((response)=>response.data)
})

export const deleteTest = createAsyncThunk('test/deleteTest',({id})=>{
    axios.delete(`http://192.168.1.66:3333/test/${id}`).then((response)=>response.data)
})

export const createTest = createAsyncThunk('test/createTest',(values)=>{
    console.log(values)
    axios.post('http://192.168.1.66:3333/test',{
            title:values.title,
            description:values.description,
            ownerId:values.ownerId
        }
    ).then((response)=>console.log(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateTest = createAsyncThunk('test/updateTest',({id,title,description,ownerId})=>{
    axios.patch(`http://192.168.1.66:3333/test/${id}}`,{
        headers:{
            "Content-type":"application/json"
        },
        body:{
            title: values.title,
            description: values.description,
            ownerId:values.ownerId
        }
    }).then((response)=>response.data)
})

const testSlice = createSlice({
    name:'test',
    initialState:{
        tests:[],
        loading:false,
        error:null
    },
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
            state.tests=action.payload
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
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(createTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            console.log(action.payload)
        })
        builder.addCase(updateTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(updateTest.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(updateTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default testSlice.reducer