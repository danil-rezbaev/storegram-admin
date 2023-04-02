import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://typper.online'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')

  try {
    config.headers.StoreId = JSON.parse(window.localStorage.getItem('store') as string)?.id
  } catch (err) {
    console.log(err)
  }

  return config
})

export default instance
