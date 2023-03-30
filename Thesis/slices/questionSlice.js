import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    currentAddedQuestion:null,
    questions:[],
    loading:false,
    error:null
 }

export const getQuestion = createAsyncThunk('question/getQuestion', (id)=>{
    return axios.get(`http://192.168.1.64:3333/question/${id}`).then((response)=>(response.data))
})

export const getQuestionByTestId = createAsyncThunk('question/getQuestionsByTestId', (id)=>{
    return axios.get(`http://192.168.1.64:3333/question/test/${id}`).then((response)=>(response.data))
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion',(id)=>{
    return axios.delete(`http://192.168.1.64:3333/question/${id}`).then((response)=>response.data)
})

export const createQuestion = createAsyncThunk('question/createQuestion',(values)=>{
    return axios.post('http://192.168.1.64:3333/question',{
            testId:values.testId,
            text:values.text,
            type:values.type
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateQuestion = createAsyncThunk('question/updateQuestion',(values)=>{
   return axios.patch(`http://192.168.1.64:3333/question/${values.id}`,{
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
    }
})

export default questionSlice.reducer