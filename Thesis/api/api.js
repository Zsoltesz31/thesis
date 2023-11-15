import axios from 'axios'

const BaseInstance = axios.create({
    baseURL:'http://209.38.176.252:3333/',
})

export default BaseInstance