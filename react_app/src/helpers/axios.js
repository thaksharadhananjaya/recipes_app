import { API_URL } from "../constant";
import axios from 'axios';

//const token = window.localStorage.getItem('token');
//console.log(token);

const axiosInstance = axios.create(window.localStorage.getItem('token') ?
    {
        baseURL: API_URL,
        headers: {
            'authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
    } : {
        baseURL: API_URL
    }

);

export default axiosInstance;