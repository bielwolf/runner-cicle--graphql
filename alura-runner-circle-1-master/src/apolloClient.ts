import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        mockActivities: {
          keyArgs: ["user"],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
    cache,
    connectToDevTools: true
});

export default client;