import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import BaseInstance from "../api/api";

const initialState={
    currentAddedQuestion:null,
    answersToQuestion:[],
    questions:[],
    loading:false,
    error:null
 }

export const getQuestion = createAsyncThunk('question/getQuestion', (id)=>{
    console.log('KÉRDÉS ID:',id)
    return BaseInstance.get(`question/${id}`).then((response)=>(response))
})

export const getQuestionByTestIdWithAnswers = createAsyncThunk('question/getQuestionsByTestIdWithAnswers', (id)=>{
    console.log(id)
    return BaseInstance.get(`answer/${id}`).then((response)=>response.data)
})

export const getQuestionByTestId = createAsyncThunk('question/getQuestionsByTestId', (id)=>{
    return BaseInstance.get(`question/test/${id}`).then((response)=>(response.data))
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion',(id)=>{
    return BaseInstance.delete(`question/${id}`).then((response)=>response.data)
})

export const createQuestion = createAsyncThunk('question/createQuestion',(values)=>{
    return BaseInstance.post(`question`,{
            testId:values.testId,
            text:values.text,
            type:values.type,
            id:values.id
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateQuestion = createAsyncThunk('question/updateQuestion',(values)=>{
    console.log(values)
   return BaseInstance.patch(`question/${values.id}`,{
            testId:values.testId,
            type:values.type,
            text:values.text,
        
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
            state.currentAddedQuestion=action.payload
            state.error=''
        })
        builder.addCase(getQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(getQuestionByTestId.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getQuestionByTestId.fulfilled,(state,action) => {
            state.loading=false
            state.questions=action.payload
            state.error=''
        })
        builder.addCase(getQuestionByTestId.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(deleteQuestion.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(deleteQuestion.fulfilled,(state,action) => {
            state.loading=false
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
            console.log('CREATE:',action.payload)
            state.loading=false
            state.currentAddedQuestion=action.payload
            state.error=''
        })
        builder.addCase(createQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(updateQuestion.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(updateQuestion.fulfilled,(state,action) => {
            state.loading=false
            state.currentAddedQuestion=action.payload
            state.error=''
        })
        builder.addCase(updateQuestion.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(getQuestionByTestIdWithAnswers.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getQuestionByTestIdWithAnswers.fulfilled,(state,action) => {
            state.loading=false
            state.answersToQuestion=[]
            state.answersToQuestion.push(action.payload)
            state.error=''
        })
        builder.addCase(getQuestionByTestIdWithAnswers.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default questionSlice.reducer