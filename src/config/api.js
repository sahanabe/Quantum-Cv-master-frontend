import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://quantumcv-backend-efbjdecdhpawckfp.japanwest-01.azurewebsites.net';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API_URL;
