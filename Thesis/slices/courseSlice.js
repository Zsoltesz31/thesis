import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import BASE_URL from '../config'
import BaseInstance from "../api/api";

const initialState={
    currentAddedCourse:null,
    courses:[],
    loading:false,
    error:null
 }

export const getAllCourses = createAsyncThunk('course/getCourses', ()=>{
    return BaseInstance.get(`course`).then((response)=>(response.data))
})

export const getCoursesByOwnerId = createAsyncThunk('course/getCoursesByOwner', (id)=>{
    return BaseInstance.get(`course/owned/${id}`).then((response)=>(response.data))
})

export const getCoursesByUserId = createAsyncThunk('test/getCoursesByUser', (id)=>{
    return BaseInstance.get(`course/user/${id}`).then((response)=>(response.data))
})


export const deleteCourse = createAsyncThunk('course/deleteCourse',(id)=>{
    return BaseInstance.delete(`course/${id}`).then((response)=>response.data)
})

export const createCourse = createAsyncThunk('course/createCourse',(values)=>{
    console.log(values)
    return BaseInstance.post(`course`,{
            name:values.title,
            description:values.description,
            ownerId:values.ownerId
        }
    ).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const updateCourse = createAsyncThunk('course/updateCourse',(values)=>{
    console.log(values)
   return BaseInstance.patch(`course/${values.courseId}`,{
            name: values.title,
            description: values.description,
            ownerId:values.ownerId
    }).then((response)=>(response.data)).catch(e=>{
        console.log(e)
    })
})

export const addUserToCourse = createAsyncThunk('course/addUserToCourse',(values)=>{
    return BaseInstance.post(`course/${values.courseId}/user/${values.userId}`).then((response)=>(response.data)).catch(e=>{
         console.log(e)
     })
 })

 export const deleteUserFromCourse = createAsyncThunk('course/deleteUserFromCourse',(values)=>{
    return BaseInstance.delete(`course/${values.testId}`)
    .then((response)=>(response.data)).catch(e=>{
         console.log(e)
     })
 })

 const courseSlice = createSlice({
    name:'course',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            state.loading=false
            state.courses=action.payload
            state.error=''
        })
        builder.addCase(getAllCourses.rejected,(state,action) =>{
            state.loading=false
            state.courses=[]
            state.error=action.error.message
        })
        builder.addCase(getCoursesByOwnerId.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getCoursesByOwnerId.fulfilled,(state,action) => {
            state.loading=false
            state.courses=action.payload
            state.error=''
        })
        builder.addCase(getCoursesByOwnerId.rejected,(state,action) =>{
            state.loading=false
            state.courses=[]
            state.error=action.error.message
        })
        builder.addCase(getCoursesByUserId.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(getCoursesByUserId.fulfilled,(state,action) => {
            state.loading=false
            state.courses=action.payload
            state.error=''
        })
        builder.addCase(getCoursesByUserId.rejected,(state,action) =>{
            state.loading=false
            state.courses=[]
            state.error=action.error.message
        })
        builder.addCase(deleteCourse.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(deleteCourse.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(deleteCourse.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(createCourse.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(createCourse.fulfilled,(state,action) => {
            state.loading=false
            state.currentAddedCourse=action.payload
            state.error=''
        })
        builder.addCase(createCourse.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(updateCourse.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(updateCourse.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(updateCourse.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(addUserToCourse.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(addUserToCourse.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(addUserToCourse.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
        builder.addCase(deleteUserFromCourse.pending,(state) =>{
            state.loading=true
        })
        builder.addCase(deleteUserFromCourse.fulfilled,(state,action) => {
            state.loading=false
            state.error=''
        })
        builder.addCase(deleteUserFromCourse.rejected,(state,action) =>{
            state.loading=false
            state.error=action.error.message
        })
    }
 })

 export default courseSlice.reducer