import axios from 'axios';

// Creation of  Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://backend-data-v1wg.onrender.com/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or headers if required
    config.headers['Authorization'] = 'Bearer your-token'; 
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
