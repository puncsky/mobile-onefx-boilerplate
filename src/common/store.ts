import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { ThemeProps } from "../types/theme-props";
import { persistedReducer } from "./root-reducer";
export interface AppState {
  base: {
    userId?: string;
    authToken?: string;
    mixpanelId?: string;
    locale?: string;
    currentTheme?: ThemeProps;
  };
}

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
