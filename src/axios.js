import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-management-backend-6ifk.onrender.com/api/v1', // Replace with your API base URL
  // baseURL: 'http://localhost:3000/api/v1', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies if needed
});

// Add request interceptor to include Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
