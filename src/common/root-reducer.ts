import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { accountReducer } from "../screens/mine-screen/account-reducer";
import { AppState } from "./store";

const UPDATE_REDUX_STATE = "UPDATE_REDUX_STATE";

const INITIAL_STATE: AppState = {
  base: {}
};

export interface Action {
  type: string;
  payload?: Object;
}

export const reducer = (state = INITIAL_STATE, action: Action) => {
  if (action.type === UPDATE_REDUX_STATE) {
    const initBase = state.base ? state.base : {};
    //@ts-ignore
    const payloadBase = action.payload.base ? action.payload.base : {};
    const base = { ...initBase, ...payloadBase };
    return {
      base
    };
  }
  return accountReducer(state, action);
};

export const actionUpdateReduxState = (payload: Object) => ({
  type: UPDATE_REDUX_STATE,
  payload
});

const persistConfig = {
  key: "root",
  storage
};

export const persistedReducer = persistReducer(persistConfig, reducer);
