import axios from "axios";
import { SERVER_URL } from "./const";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || SERVER_URL
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
