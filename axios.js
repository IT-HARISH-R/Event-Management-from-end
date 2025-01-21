import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1', // Base URL for your backend API
  headers: {
    'Content-Type': 'multipart/form-data', // Set default content type for file uploads
    // Add any other default headers here, such as authorization if needed
  },
});

export default api;
