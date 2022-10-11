import {createStore,applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"

import authReducer from "./reducers/auth.js"
import courseReducer from "./reducers/courses.js"

const middleware = [thunk]
const store = createStore(combineReducers({authReducer,courseReducer}), applyMiddleware(...middleware));

export default store;