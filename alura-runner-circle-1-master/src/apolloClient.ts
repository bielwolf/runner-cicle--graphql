import { ApolloClient, InMemoryCache, HttpLink, gql, makeVar } from '@apollo/client';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

// Definindo variáveis reativas para estado local
export const searchQueryVar = makeVar(''); // Criamos uma variável reativa chamada searchQueryVar

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchQuery: {
          read() {
            return searchQueryVar(); // Usamos a variável reativa na query local
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

(async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
})();



const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  cache,
  connectToDevTools: true, // Habilita Apollo DevTools
});

// Definindo a query local
export const GET_SEARCH_QUERY = gql`
  query GetSearchQuery {
    searchQuery @client
  }
`;

// Definindo a mutation local
export const SET_SEARCH_QUERY = gql`
  mutation SetSearchQuery($query: String!) {
    setSearchQuery(query: $query) @client
  }
`;

export default client;