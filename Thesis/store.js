import {createStore,applyMiddleware, combineReducers} from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import authReducer from "./reducers/auth.js"
import course from "./slices/courseSlice"
import user from "./slices/authSlice"

const middleware = [thunk]
const reducer = combineReducers({
    authReducer,course,user
})

const store = configureStore({
    reducer,
    middleware: middleware

})

export default store;