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
};

export default User;
