import { ApolloClient, InMemoryCache, HttpLink, gql, makeVar } from '@apollo/client';

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
    uri: 'http://localhost:4000/'
  }),
  cache,
});

// Definindo a query local
export const GET_SEARCH_QUERY = gql`
  query GET_SEARCH_QUERY {
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
