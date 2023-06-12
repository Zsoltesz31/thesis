import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'

const getData = async ()=>{
    try{
        const storageValue = await AsyncStorage.getItem('userInfo')
        if(storageValue!==null){
            console.log(storageValue)
        }
    }catch(e){
        console.log(e)
    }
}
getData()
const BaseInstance = axios.create({
    baseURL:'http://192.168.1.64:3333/',
    headers:{
        'Authorization' : `Bearer ${AsyncStorage.getItem('userInfo')}`
    }
})
export default BaseInstance