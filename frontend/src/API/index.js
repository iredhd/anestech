import axios from 'axios';
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

if (token) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default instance;
