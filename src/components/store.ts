import { createStore } from "redux";

export interface AppState {}

export interface Action {
  type: string;
  payload: Object;
}

const INITIAL_STATE: AppState = {
  snippets: []
};

const UPDATE_REDUX_STATE = "UPDATE_REDUX_STATE";

const reducer = (state = INITIAL_STATE, action: Action) => {
  if (action.type === UPDATE_REDUX_STATE) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
};

export const store = createStore(reducer, {});
export const actionUpdateReduxState = (payload: Object) => ({
  type: UPDATE_REDUX_STATE,
  payload
});
