import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restore-brecho.herokuapp.com',
});
api.defaults.headers.authorization = localStorage.getItem('@ReStore:token');

export default api;
