import { ActionTypes } from '../actions';

const initialState = {
  token: null,
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_STORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };
    case ActionTypes.AUTH_CLEAR_TOKEN:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
