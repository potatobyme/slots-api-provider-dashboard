import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

interface Headers {
  [key: string]: string;
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/graphql` : 'http://localhost:5000/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }: { headers?: Headers } = {}) => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
}); 