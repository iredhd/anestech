import { ActionTypes } from '.';
import { clearData } from './user';
import { Auth } from '../../services';

export const storeToken = (token) => ({
  type: ActionTypes.AUTH_STORE_TOKEN,
  payload: {
    token,
  },
});

export const clearToken = () => ({
  type: ActionTypes.AUTH_CLEAR_TOKEN,
  payload: {},
});

export const logout = () => (dispatch) => {
  dispatch(clearData());
  dispatch(clearToken());
  Auth.logout();
};
