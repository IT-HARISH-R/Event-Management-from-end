import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data', 
  },
  withCredentials: true,
});

export default api;
