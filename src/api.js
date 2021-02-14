import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from "@apollo/client";
import { TOKEN } from "./queries";

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

  const httpLink = createHttpLink({uri: getApiLocation(), credentials: "include"});

  const authLink = new ApolloLink((operation, forward) => {
    const { cache } = operation.getContext();
    let token;
    try {
      const cacheValue = cache.readQuery({query: TOKEN});
      token = cacheValue.accessToken;
    } catch {
      token = null;
    }
    operation.setContext(({ headers }) => ({ headers: {
      authorization: token, ...headers
    }}));
    return forward(operation);
  });

  const link = ApolloLink.from([authLink, httpLink]);

  const cache = new InMemoryCache({
    typePolicies: {
      UserType: {fields: {
        projects: {merge(existing, incoming) { return incoming } },
        projectCategories: {merge(existing, incoming) { return incoming } },
      }}
    }
  })

  return new ApolloClient({link: link, cache, credentials: "include"});
}
