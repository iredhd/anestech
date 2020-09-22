import API from '../API';
import { catchAPIError } from '../helpers/errors';

const Task = {
  getList: async (params = {}) => {
    try {
      const { data } = await API.get('/tasks', params);

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
      const { data } = await API.get(`/tasks/${id}`);

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
      await API.delete(`/tasks/${id}`);

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
  create: async (body = {}) => {
    try {
      const { data } = await API.post('/tasks', body);

      return {
        success: true,
        body: data.id,
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
      const { data } = await API.put(`/tasks/${id}`, body);

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

export default Task;
