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
};

export default Task;
