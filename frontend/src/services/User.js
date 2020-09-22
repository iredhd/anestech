import API from '../API';
import { catchAPIError } from '../helpers/errors';

const User = {
  getList: async (params = {}) => {
    try {
      const { data } = await API.get('/users', params);

      return {
        success: true,
        body: {
          items: data.data,
          total: data.total,
          page: data.page,
        },
      };
    } catch (e) {
      return {
        success: false,
        body: catchAPIError(e),
      };
    }
  },
  get: async (id = '') => {
    try {
      const { data } = await API.get(`/users/${id}`);

      return {
        success: true,
        body: data,
      };
    } catch (e) {
      return {
        success: false,
        body: catchAPIError(e),
      };
    }
  },
  delete: async (id = '') => {
    try {
      await API.delete(`/users/${id}`);

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        body: catchAPIError(e),
      };
    }
  },
  create: async ({ email, name, password }) => {
    try {
      const { data } = await API.post('/users', {
        email,
        name,
        password,
      });

      return {
        success: true,
        body: data,
      };
    } catch (e) {
      return {
        success: false,
        body: catchAPIError(e),
      };
    }
  },
  update: async (id = '', body = {}) => {
    try {
      const { data } = await API.put(`/users/${id}`, body);

      return {
        success: true,
        body: data,
      };
    } catch (e) {
      return {
        success: false,
        body: catchAPIError(e),
      };
    }
  },
};

export default User;
