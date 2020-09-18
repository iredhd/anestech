import { ActionTypes } from '../actions';

const initialState = {
  name: null,
  email: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_STORE_DATA:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };
    case ActionTypes.USER_CLEAR_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
