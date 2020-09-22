import axios from 'axios';
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

if (token) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default {
  get: (route, params = {}) => instance.get(route, { params }),
  post: (route, body = {}) => instance.post(route, body),
  delete: (route, body = {}) => instance.delete(route, body),
  put: (route, body = {}) => instance.put(route, body),
};
