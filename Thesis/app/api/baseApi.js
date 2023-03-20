import axios from 'axios'

const BaseApi = axios.create({
    baseURL:'http://192.168.1.66:3333',
    responseType:'json',
    withCredentials:true
})

export default BaseApi