import axios from 'axios';

import { get } from 'lodash';
import { store } from '../store';
import { logout } from '../store/actions/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
  };

  const state = store.getState();

  const token = get(state, 'auth.token', null);

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }

  return newConfig;
});

instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    const newError = { ...error };

    newError.response.data = {
      message: 'Sua sessão expirou, por favor faça login para acessar esta página.',
    };

    store.dispatch(logout());
    return Promise.reject(newError);
  }
  return Promise.reject(error);
});

export default {
  get: (route, params = {}) => instance.get(route, { params }),
  post: (route, body = {}) => instance.post(route, body),
  delete: (route, body = {}) => instance.delete(route, body),
  put: (route, body = {}) => instance.put(route, body),
};
