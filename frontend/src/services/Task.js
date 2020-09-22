import API from '../API';

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
      console.error(e);
      return {
        success: false,
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
      console.error(e);
      return {
        success: false,
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
      console.error(e);
      return {
        success: false,
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
      console.error(e);
      return {
        success: false,
      };
    }
  },
  update: async (id = '', body = {}) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, body);

      return {
        success: true,
        body: data.id,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
      };
    }
  },
};

export default Task;
