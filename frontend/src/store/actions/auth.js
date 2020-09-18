import { ActionTypes } from '.';

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
