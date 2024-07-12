import axios from 'axios';

const Axios = axios.create()
Axios.defaults.baseURL = 'http://localhost:3000/'
Axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token') 

export default Axios