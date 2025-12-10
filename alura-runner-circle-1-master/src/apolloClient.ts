import { ApolloClient, InMemoryCache, HttpLink, gql, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

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

(async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
})();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});

export const GET_SEARCH_QUERY = gql`
  query GetSearchQuery {
    searchQuery @client
  }
`;

export const SET_SEARCH_QUERY = gql`
  mutation SetSearchQuery($query: String!) {
    setSearchQuery(query: $query) @client
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default client;