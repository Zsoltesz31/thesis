import {createStore,applyMiddleware, combineReducers} from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import course from "./slices/courseSlice"
import test from "./slices/testSlice"
import question from "./slices/questionSlice"
import answer from "./slices/answerSlice"
import upComingTest from "./slices/upcommingTestSlice"

const middleware = [thunk]
const reducer = combineReducers({
    course,test,question,answer,upComingTest
})

const store = configureStore({
    reducer,
    middleware: middleware

})

export default store;