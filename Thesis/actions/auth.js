import AuthService from "../services/authService"

const LOGIN_SUCCES = "LOGIN_SUCCES";
const LOGOUT = "LOGOUT";

export const login = (user) => (dispatch) => {
    return AuthService.logIn(user).then(
        (response) =>{
            if(response.status=== "success") {
                dispatch({
                    type:LOGIN_SUCCES,
                    payload: { user:response.user}
                })
            
            Promise.resolve()
                return response
            }
        },
        (error) => {
            const message = error.toString()
           
            Promise.reject()
                return message
        }
    )
}

export const logout = () => (dispatch) => {
    return AuthService.logOut().then((response) => {
        if(response.status==="success"){
            dispatch({
                type:LOGOUT
            })
            Promise.resolve()
                return response
        }
    })
}