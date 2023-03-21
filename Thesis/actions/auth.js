import { userLogin } from "../app/api/userApi"
import AsyncStorage from "@react-native-async-storage/async-storage"

async function storeUserToken(token){
    try{
    await AsyncStorage.setItem('userToken',token)
    } catch(error){
        console.log(error)
    }
}

export const getUserToken = async (tokenKey) => {
    try {
      const data = await AsyncStorage.getItem(tokenKey);
      if (data !== null) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

export const loginUser = (
    async (user) => {
    const promise = userLogin({
       email:user.email,
       password:user.password
    }).then((result)=>{
       if(result.status==200){
          return result.data
       }
    }).catch(err=>{
       console.error(err)
    })
    const data = await promise
    storeUserToken(data.access_token)
 })


 