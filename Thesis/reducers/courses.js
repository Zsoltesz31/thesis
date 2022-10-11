import AsyncStorage from "@react-native-async-storage/async-storage"

const GET_COURSES = "GET_COURSES"


const initialState = {courses:[]}


export default courses = (state=initialState,action) => {
    const {type,payload} = action

    switch(type){
        case GET_COURSES:
            return{
                ...state,
                courses:payload.courses
            }
        default:
            return state
    }
}
 