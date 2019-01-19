import { createStore } from 'redux';

interface AppState {
}

const INITIAL_STATE: AppState = {
};

const UPDATE_REDUX_STATE = 'UPDATE_REDUX_STATE';

const reducer = (state = INITIAL_STATE, action) => {
  if (action.type === UPDATE_REDUX_STATE) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
};

export const store = createStore(reducer, {});
export const actionUpdateReduxState = payload => ({
  type: UPDATE_REDUX_STATE,
  payload
});
