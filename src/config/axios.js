import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "" : "http://192.168.1.88:8000"
})

export default instance