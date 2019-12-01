import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { store } from "./store";

export const ENDPOINT = "https://guigu.io/";

export const headers: { [key: string]: string } = {
  "x-app-id": "mobile-guiguio"
};

export const getEndpoint = (path: string) => `${ENDPOINT}${path}`;

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { authorization: `Bearer ${store.getState().base.authToken}` }
  });
  return forward(operation);
});

// use with apollo-client
const link = middlewareLink.concat(
  new HttpLink({
    uri: getEndpoint("api-gateway/"),
    fetch
  })
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
