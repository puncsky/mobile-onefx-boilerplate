import * as Locatization from "expo-localization";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { persistedReducer } from "./root-reducer";
import { theme } from "./theme";

export interface AppState {
  base: {
    userId?: string;
    authToken?: string;
    mixpanelId?: string;
    locale?: string;
    currentTheme?: "dark" | "light";
  };
}

type Mode = "dark" | "light";

const preloadedState: AppState = {
  base: {
    locale: Locatization.locale,
    currentTheme: theme.name as Mode
  }
};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  preloadedState as any,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
