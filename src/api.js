import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

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
    return "https://api.stratako.com/graphql";
  }
}


export const makeClient = () => {
  /**
   * Creates an apollo client with automatic token insertion, and catchall
   * error handling.
   */

  const httpLink = new HttpLink({uri: getApiLocation(), credentials: "include"});
  const link = ApolloLink.from([httpLink]);
  return new ApolloClient({link: link, cache: new InMemoryCache(), credentials: "include"});
}
