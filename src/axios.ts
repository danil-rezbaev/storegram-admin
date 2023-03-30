import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://typper.online'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  config.headers.Store = window.localStorage.getItem('store')
  return config
})

export default instance
