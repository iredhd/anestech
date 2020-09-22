import { get } from 'lodash';
import API from '../API';
import { INTERNAL_ERROR } from '../constants/API';
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/storage';

const Auth = {
  register: async ({ email, name, password }) => {
    try {
      await API.post('/users', {
        email,
        name,
        password,
      });

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        body: get(e, 'response.data.error.message', INTERNAL_ERROR),
      };
    }
  },
  login: async ({ email, password }) => {
    try {
      const { data: { token: { token }, user } } = await API.post('/sessions', {
        email,
        password,
      });

      Auth.setToken(token);

      return {
        success: true,
        body: {
          user,
          token,
        },
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  },
  logout: () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);

    return {
      success: true,
    };
  },
  getToken: () => {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || null;

    return {
      success: true,
      body: token,
    };
  },
  setToken: (token) => {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);

    return {
      success: true,
    };
  },
};

export default Auth;
