import React, {createContext,useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE_URL from '../config'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [userInfo,setUserInfo] = useState({})
    const [userData,setUserData] = useState({})
    const [errorMsg,setErrorMsg] = useState('')

    const register = (firstName,lastName,email,password) =>{
        axios.post(`${BASE_URL}auth/signup`,{
            firstName,lastName,email,password
        }).then(res=>{
            let userInfo=res.data
        }).catch(e=>{
            console.log(e)
        })
    }

    const login =(email,password)=>{
        axios.post(`${BASE_URL}auth/signin`,{
        email,password
    }).then(res=>{
            let userInfo=res.data
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))

        }).catch(e=>{
            setErrorMsg('Sikertelen bejelentkezés! A jelszó vagy az e-mail cím nem megfelelő!')
        })
    }

    const getUserData =(userInfo)=>{

        axios.get(`${BASE_URL}users/me`,{
            headers:{
                'Authorization' : `Bearer ${userInfo.access_token}`
            }
        }
    ).then(res=>{
            let userData=res.data
            setUserData(userData)
            AsyncStorage.setItem('userData',JSON.stringify(userData))

        }).catch(e=>{
     
        })
    }

    const logout = () =>{
        AsyncStorage.removeItem('userInfo')
        setUserInfo({})
    }


    return(
    <AuthContext.Provider value={{login,userInfo,logout,register,getUserData,userData,errorMsg}}>{children}</AuthContext.Provider>
    )
}