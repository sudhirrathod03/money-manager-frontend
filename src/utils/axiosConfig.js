import axios from 'axios';

const API = axios.create({
  baseURL: 'https://money-manager-backend-fuyj.onrender.com/api/transactions', 
});

export default API;