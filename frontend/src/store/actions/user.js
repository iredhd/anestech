import { ActionTypes } from '.';

export const storeData = ({ name, email }) => ({
  type: ActionTypes.USER_STORE_DATA,
  payload: {
    name,
    email,
  },
});

export const clearData = () => ({
  type: ActionTypes.USER_CLEAR_DATA,
  payload: {},
});
