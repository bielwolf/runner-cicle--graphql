
import { ApolloClient, InMemoryCache, HttpLink, makeVar } from '@apollo/client';

// Definindo variáveis reativas para estado local
export const searchQueryVar = makeVar('');

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchQuery: {
          read() {
            return searchQueryVar();
          },
        },
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
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  cache,
});

export default client;

