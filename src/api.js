import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from 'apollo-link-error';
import ApolloClient from "apollo-client";

export const isDevelopment = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}

export const getApiLocation = () => {
  if (isDevelopment()) {
    return "http://localhost:8045/";
  } else {
    return "https://api.stratako.com/";
  }
}

export const makeClient = () => {
  /**
   * Makes an apollo client and returns it.
   */

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({ headers: {
      authorization: localStorage.getItem("token"), ...headers
    }}));
    return forward(operation);
  });
  const logoutLink = onError(({ networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      localStorage.clear();
      window.location.href = "/";
    };
  })
  const httpLink = createHttpLink({ uri: getApiLocation() });
  const link = ApolloLink.from([authLink, logoutLink, httpLink]);
  return new ApolloClient({link: link, cache: new InMemoryCache()});
}