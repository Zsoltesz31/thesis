import React, {createContext,useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [userInfo,setUserInfo] = useState({})

    const register = (firstName,lastName,email,password) =>{
        axios.post('http://192.168.1.66:3333/auth/signup',{
            firstName,lastName,email,password
        }).then(res=>{
            let userInfo=res.data
            console.log(userInfo)
        }).catch(e=>{
            console.log(e)
        })
    }

    const login =(email,password)=>{
        console.log(email)
        axios.post('http://192.168.1.66:3333/auth/signin',{
        email,password
    }).then(res=>{
            let userInfo=res.data
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
            console.log(userInfo)
        }).catch(e=>{
            console.log(e)
        })
    }

    const logout = () =>{
        AsyncStorage.removeItem('userInfo')
        setUserInfo({})
    }


    return(
    <AuthContext.Provider value={{login,userInfo,logout,register}}>{children}</AuthContext.Provider>
    )
}