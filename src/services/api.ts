import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://restorebrecho.com.br:3333',
  baseURL: 'http://localhost:1158',
});
api.defaults.headers.authorization = localStorage.getItem('@ReStore:token');

export default api;
