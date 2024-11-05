// services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Utiliza la URL definida en .env
});

export default api;
