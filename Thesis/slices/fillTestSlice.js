import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import BaseInstance from "../api/api";

const initialState={
    startedTest:null,
    testResults:[],
    loading:false,
    error:null
 }


export const setFillStartTest = createAsyncThunk('fill/setFillStartTest', (values)=>{
    return BaseInstance.post(`fill/start-test`,{
        userId:values.userId,
        upComingTestId:values.upComingTestId
    }).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const setFillEndTest = createAsyncThunk('fill/setFillEndTest', (id) =>{
    console.log('END ID:',id)
    return BaseInstance.post(`fill/end-test/${id}`).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const getTestResultsTest = createAsyncThunk('fill/getTestResults', (id)=>{
    return BaseInstance.get(`fill/test-results/${id}`).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const setFillAnswer = createAsyncThunk('fill/setFillAnswer',(values)=>{
    console.log('FILL ANSWER ÉRTÉKEK:',values)
    return BaseInstance.post(`fill/answer`,{
            userId:values.userId,
            questionId:values.questionId,
            answerId:values.answerId,
            upcomingTestId:values.upcomingTestId
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})


const fillTestSlice = createSlice({
    name:'fillTest',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(setFillStartTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(setFillStartTest.fulfilled,(state,action) => {
            state.loading=false
            state.startedTest=action.payload
            state.error=''
        })
        builder.addCase(setFillStartTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(setFillEndTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(setFillEndTest.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(setFillEndTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(setFillAnswer.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(setFillAnswer.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(setFillAnswer.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        }) 
        builder.addCase(getTestResultsTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getTestResultsTest.fulfilled,(state,action) => {
            state.loading=false
            state.testResults=action.payload
            state.error=''
        })
        builder.addCase(getTestResultsTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default fillTestSlice.reducer