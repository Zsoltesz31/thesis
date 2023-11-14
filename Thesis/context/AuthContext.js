import React, {createContext,useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE_URL from '../config'
import BaseInstance from '../api/api'

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
            console.log('authContext:',JSON.stringify(e))
        })
    }

    const login = async (email,password)=>{
        axios.post(`${BASE_URL}auth/signin`, 
        {
            email,password
        },
    )
    .then(async (res)=>{
            let userInfo=res.data
            setUserInfo(userInfo)
            await AsyncStorage.setItem('token',userInfo.access_token)

            const tokenValue = res.data.access_token
            console.log(`Token value: ${tokenValue}`)
            BaseInstance.interceptors.request.clear()
            BaseInstance.interceptors.request.use((config)=>{
                config.headers.Authorization = `Bearer ${tokenValue}`

                return config
            })
            BaseInstance.interceptors.response.use(value => value, (error) => {
                    if(error.response?.status === 401)
                    {
                       logout()
                    }

            })

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
        ).then(async(res)=>{
            let userData=res.data
            setUserData(userData)
            await AsyncStorage.setItem('userData',JSON.stringify(userData))
        }).catch(e=>{
     
        })
    
    }

    const logout = async () =>{
        console.log('Logout called')
        await AsyncStorage.removeItem('userData')
        await AsyncStorage.removeItem('token')
        setUserInfo({})
        BaseInstance.interceptors.request.clear()
    }


    return(
    <AuthContext.Provider value={{login,userInfo,logout,register,getUserData,userData,errorMsg}}>{children}</AuthContext.Provider>
    )
    
}

