import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/',
});
api.defaults.headers.authorization = localStorage.getItem('@ReStore:token');

export default api;
