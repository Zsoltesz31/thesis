import {createStore,applyMiddleware, combineReducers} from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import course from "./slices/courseSlice"
import test from "./slices/testSlice"

const middleware = [thunk]
const reducer = combineReducers({
    course,test
})

const store = configureStore({
    reducer,
    middleware: middleware

})

export default store;