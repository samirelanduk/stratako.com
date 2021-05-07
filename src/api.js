import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from "@apollo/client";
import { TOKEN } from "./queries";

export const makeClient = () => {
  /**
   * Creates an apollo client with automatic token insertion, and catchall
   * error handling.
   */

  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND}/graphql`,
    credentials: "include"
  });

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
        operationsWithoutSlots: {merge(existing, incoming) { return incoming } },
      }},
      SlotType: {fields: {
        futureOperations: {merge(existing, incoming) { return incoming } },
      }},
      ProjectType: {fields: {
        operations: {merge(existing, incoming) { return incoming } },
      }},
      OperationType: {fields: {
        projects: {merge(existing, incoming) { return incoming } },
      }}
    }
  })

  return new ApolloClient({link: link, cache, credentials: "include"});
}
