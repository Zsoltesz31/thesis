import {createStore,applyMiddleware, combineReducers} from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import course from "./slices/courseSlice"
import test from "./slices/testSlice"
import question from "./slices/questionSlice"
import answer from "./slices/answerSlice"
import upComingTest from "./slices/upcommingTestSlice"
import users from "./slices/usersSlice"
import fill from "./slices/fillTestSlice"

const middleware = [thunk]
const reducer = combineReducers({
    course,test,question,answer,upComingTest,users,fill
})

const store = configureStore({
    reducer,
    middleware: middleware

})

export default store;