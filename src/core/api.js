import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

export const isDevelopment = () => {
  /**
   * Returns true if app is running locally.
   */
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}

export const getApiLocation = () => {
  /**
   * Gets the URL of the API.
   */

  if (isDevelopment()) {
    return "http://localhost:8003/graphql";
  } else {
    return "https://api.stratako.lytiko.com/graphql";
  }
}


export const makeClient = () => {
  /**
   * Creates an apollo client with automatic token insertion, and catchall
   * error handling.
   */

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({ headers: {
      authorization: localStorage.getItem("token"), ...headers
    }}));
    return forward(operation);
  });
  const logoutLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors && graphQLErrors.length) {
      if (graphQLErrors[0].message === "Not authorized") {
        localStorage.clear();
        window.location.href = "/";
      }
    };
  });
  const httpLink = createHttpLink({ uri: getApiLocation() });
  const link = ApolloLink.from([authLink, logoutLink, httpLink]);
  return new ApolloClient({link: link, cache: new InMemoryCache()});
}
