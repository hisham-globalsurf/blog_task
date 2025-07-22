import axios from 'axios';

const backendAPI = import.meta.env.VITE_BACKEND_API;

const axiosInstance = axios.create({
  baseURL: backendAPI,
  withCredentials: true, 
});

export default axiosInstance;
