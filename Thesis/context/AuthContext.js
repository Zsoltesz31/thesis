import React, {createContext,useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [userInfo,setUserInfo] = useState({})
    const [userData,setUserData] = useState({})
    const [errorMsg,setErrorMsg] = useState('')

    const register = (firstName,lastName,email,password) =>{
        axios.post('http://192.168.1.64:3333/auth/signup',{
            firstName,lastName,email,password
        }).then(res=>{
            let userInfo=res.data
        }).catch(e=>{
            console.log(e)
        })
    }

    const login =(email,password)=>{
        axios.post('http://192.168.1.64:3333/auth/signin',{
        email,password
    }).then(res=>{
            let userInfo=res.data
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))

        }).catch(e=>{
            setErrorMsg('Sikertelen bejelentkezés! A jelszó vagy az e-mail cím nem megfelelő!')
            console.log(errorMsg)
        })
    }

    const getUserData =(userInfo)=>{

        axios.get('http://192.168.1.64:3333/users/me',{
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