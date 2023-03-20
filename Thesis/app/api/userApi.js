import BaseApi from "./baseApi";
import axios from 'axios'

export const userLogin = async (data) => {
    try {
         const result = await BaseApi('/auth/signin',{
            method:'POST',
             headers:{
                 'Content-Type' :'application/json'
             },
             data:data
     })
        return result
    } 
    catch (error) {
        if(error.response){
           console.log(error.response.data)
        } else if(error.request) {
            console.log(error.request)
        } else{
            console.log('Error',error.message)
        }
    }
}