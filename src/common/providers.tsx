import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { apolloClient } from "./apollo-client";
import { persistor, store } from "./store";
import { antdDarkTheme, antdLightTheme } from "./theme";

export function Providers({
  children
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    <Provider store={store}>
      <AntdProvider
        theme={
          store.getState().base.currentTheme === "dark"
            ? antdDarkTheme
            : antdLightTheme
        }
      >
        <PersistGate persistor={persistor}>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </PersistGate>
      </AntdProvider>
    </Provider>
  );
}
