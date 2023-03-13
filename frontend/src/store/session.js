import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';

// action creators
const actionSetUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};


// TODO export login thunk action
export const thunkLoginUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(actionSetUser(data.user));
  return res;
};

// TODO export thunk restore user
export const thunkRestoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(actionSetUser(data.user));
  return response;
};



// TODO initial state - set user as null 
const initialState = { user: null };

// TODO export default session reducer
const sessionReducer = (state = initialState, action ) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    default:
      return state;
  };
};

export default sessionReducer;