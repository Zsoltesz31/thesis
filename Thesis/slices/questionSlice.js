import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    questions:[],
    loading:false,
    error:null
 }

export const getQuestion = createAsyncThunk('question/getQuestion', ()=>{
    return axios.get('http://192.168.1.66:3333/question').then((response)=>(response.data))
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion',({id})=>{
    return axios.delete(`http://192.168.1.66:3333/question/${id}`).then((response)=>response.data)
})

export const createQuestion = createAsyncThunk('question/createQuestion',(values)=>{
    console.log(values)
    return axios.post('http://192.168.1.66:3333/question',{
            testId:values.testId,
            text:values.text,
       
        }
    ).then((response)=>console.log(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateQuestion = createAsyncThunk('question',({values})=>{
   return axios.patch(`http://192.168.1.66:3333/question/${values.id}}`,{
        headers:{
            "Content-type":"application/json"
        },
        body:{
            testId:values.testId,
            text:values.text,
        }
    }).then((response)=>response.data)
})

const questionSlice = createSlice({
    name:'question',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getQuestion.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getQuestion.fulfilled,(state,action) => {

            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(getQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(deleteQuestion.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(deleteQuestion.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(deleteQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(createQuestion.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(createQuestion.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(createQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            console.log(action.payload)
        })
        builder.addCase(updateQuestion.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(updateQuestion.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(updateQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default questionSlice.reducer