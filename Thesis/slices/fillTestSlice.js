import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import BaseInstance from "../api/api";

const initialState={
    startedTest:null,
    testResults:[],
    whoFilledTheTests:[],
    testResultsByStudents:[],
    answnersGivenByStudents:[],
    loading:false,
    error:null
 }


export const setFillStartTest = createAsyncThunk('fill/setFillStartTest', (values)=>{
    console.log(values)
    return BaseInstance.post(`fill/start-test`,{
        upComingTestId:values.upComingTestId
    }).then((response)=>(response.data)).catch(e=>{
        console.log(JSON.stringify(e.message))
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

export const getTeacherFilledTestsGroupedByUpcomingTest = createAsyncThunk('fill/getTeacherFilledTestsGroupedByUpcomingTest', (id)=>{
    return BaseInstance.get(`fill/filled-tests/teacher/upcomingtest/${id}`).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const getStudentAnswersFromTeacherSide = createAsyncThunk('fill/getStudentAnswersFromTeacherSide', (values)=>{
    console.log(values)
    return BaseInstance.get(`fill/filled-tests/teacher/upcomingtest/${values.id}/user/${values.uid}`).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const getStudentFilledTestByCourseIdAndUserId = createAsyncThunk('fill/getStudentFilledTestByCourseIdAndUserId', (id)=>{
    return BaseInstance.get(`fill/filled-tests/student/course/${id}`).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const getStudentGivenAnswers = createAsyncThunk('fill/getStudentGivenAnswers', (id)=>{
    return BaseInstance.get(`fill/filled-tests/student/upcomingtest/${id}`).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const getResultForStudent = createAsyncThunk('fill/getResultForStudent', ()=>{
    return BaseInstance.get(`fill/test-results/student`).then((response)=>response.data).catch(e=>{
        console.log(e)
    })
})

export const setFillAnswer = createAsyncThunk('fill/setFillAnswer',(values)=>{
    console.log('FILL ANSWER ÉRTÉKEK:',values)
    return BaseInstance.post(`fill/answer`,{
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
        builder.addCase(getResultForStudent.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getResultForStudent.fulfilled,(state,action) => {
            state.loading=false
            state.testResults=action.payload
            state.error=''
        })
        builder.addCase(getResultForStudent.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            
        })
        builder.addCase(getStudentFilledTestByCourseIdAndUserId.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getStudentFilledTestByCourseIdAndUserId.fulfilled,(state,action) => {
            state.loading=false
            state.testResults=action.payload
            state.error=''
        })
        builder.addCase(getStudentFilledTestByCourseIdAndUserId.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            
        })
        builder.addCase(getTeacherFilledTestsGroupedByUpcomingTest.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getTeacherFilledTestsGroupedByUpcomingTest.fulfilled,(state,action) => {
            state.loading=false
            state.whoFilledTheTests=action.payload
            state.error=''
        })
        builder.addCase(getTeacherFilledTestsGroupedByUpcomingTest.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            
        })
        builder.addCase(getStudentAnswersFromTeacherSide.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getStudentAnswersFromTeacherSide.fulfilled,(state,action) => {
            state.loading=false
            state.testResultsByStudents=action.payload
            state.error=''
        })
        builder.addCase(getStudentAnswersFromTeacherSide.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            
        })
        builder.addCase(getStudentGivenAnswers.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getStudentGivenAnswers.fulfilled,(state,action) => {
            state.loading=false
            state.answnersGivenByStudents=action.payload
            state.error=''
        })
        builder.addCase(getStudentGivenAnswers.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
            
        })
    }
})

export default fillTestSlice.reducer