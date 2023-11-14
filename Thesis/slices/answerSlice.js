import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import BaseInstance from "../api/api";

const initialState={
    answers:[],
    loading:false,
    error:null
 }

export const getAnwser = createAsyncThunk('answer/getAnswer', (id)=>{
    return BaseInstance.get(`answer/${id}`).then((response)=>(response.data))
})

export const deleteAnswer = createAsyncThunk('answer/deleteAnswer',(id)=>{
    return BaseInstance.delete(`answer/${id}`).then((response)=>response.data)
})

export const createAnswer = createAsyncThunk('answer/createAnswer',(values)=>{
    return BaseInstance.post(`answer`,{
            questionId:values.questionId,
            text:values.text,
            point:values.point
        }
    ).then((response)=>response.data).catch(e=>{
        console.log(e)
    })
})

export const updateAnswer = createAsyncThunk('answer/updateAnswer',(values)=>{
   return BaseInstance.patch(`answer/${values.id}`,{
            questionId:values.questionId,
            answerId:values.id,
            text:values.text,
            point:values.point,
    }).then((response)=>response.data).catch(e=>{
        console.log(e)
    })
})

const answerSlice = createSlice({
    name:'answer',
    initialState,
    reducers:{
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getAnwser.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getAnwser.fulfilled,(state,action) => {
            state.loading=false
            state.answers=action.payload
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
            state.answers=action.payload
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
            state.error=''
        })
        builder.addCase(updateAnswer.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export const {reset} = answerSlice.actions
export default answerSlice.reducer