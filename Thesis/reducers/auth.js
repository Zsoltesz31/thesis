import AsyncStorage from "@react-native-async-storage/async-storage"

const LOGIN_SUCCES="LOGIN_SUCCES"
const LOGOUT = "LOGOUT"

const user = AsyncStorage.getItem("user")
const initialState= user ? {isLoggedIn: true, user} : {isLoggedIn: false, user:null}

export default auth = (state = initialState, action) => {
    const {type,payload} = action;

    switch(type) {
        case LOGIN_SUCCES:
        return{
            ...state,
            isLoggedIn: true,
            user:payload.user
        }
        case LOGOUT:
        return{
            ...state,
            isLoggedIn: false,
            user:null
        }
        default:
            return state
    }
}