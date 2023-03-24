import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    answers:[],
    loading:false,
    error:null
 }

export const getAnwser = createAsyncThunk('answer/getAnswer', ()=>{
    return axios.get('http://192.168.1.66:3333/test').then((response)=>(response.data))
})

export const deleteAnswer = createAsyncThunk('answer/deleteAnswer',({id})=>{
    return axios.delete(`http://192.168.1.66:3333/test/${id}`).then((response)=>response.data)
})

export const createAnswer = createAsyncThunk('answer/createAnswer',(values)=>{
    console.log(values)
    return axios.post('http://192.168.1.66:3333/answer',{
            questionId:values.questionId,
            text:values.text,
            correct:values.correct
           
        }
    ).then((response)=>console.log(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateAnswer = createAsyncThunk('answer/updateAnswer',({values})=>{
   return axios.patch(`http://192.168.1.66:3333/test/${id}}`,{
        headers:{
            "Content-type":"application/json"
        },
        body:{
            questionId:values.questionId,
            text:values.text,
            correct:values.correct
        }
    }).then((response)=>response.data)
})

const answerSlice = createSlice({
    name:'answer',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAnwser.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getAnwser.fulfilled,(state,action) => {

            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(getAnwser.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(deleteAnswer.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(deleteAnswer.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(deleteAnswer.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(createAnswer.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(createAnswer.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(createAnswer.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            console.log(action.payload)
        })
        builder.addCase(updateAnswer.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(updateAnswer.fulfilled,(state,action) => {
            state.loading=false
            state.tests=action.payload
            state.error=''
        })
        builder.addCase(updateAnswer.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default answerSlice.reducer