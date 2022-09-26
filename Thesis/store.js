import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"

import authReducer from "./reducers/auth.js"

const middleware = [thunk]
const store = createStore(authReducer, applyMiddleware(...middleware));

export default store;