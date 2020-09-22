import { ActionTypes } from '.';

export const storeData = ({ name, email, id }) => ({
  type: ActionTypes.USER_STORE_DATA,
  payload: {
    name,
    email,
    id,
  },
});

export const clearData = () => ({
  type: ActionTypes.USER_CLEAR_DATA,
  payload: {},
});
