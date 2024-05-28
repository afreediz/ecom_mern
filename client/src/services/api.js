import axios from "axios";
import { api_url } from "../datas";

const API = axios.create({baseURL:api_url})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('token')){
        req.headers.Authorization = localStorage.getItem('token')
    }
    return req
})

export default API;

export const format_date = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
}