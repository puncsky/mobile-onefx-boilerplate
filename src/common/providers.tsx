import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { apolloClient } from "./apollo-client";
import { persistor, store } from "./store";

export function Providers({
  children
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
