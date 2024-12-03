import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Update with your JSON server URL
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
