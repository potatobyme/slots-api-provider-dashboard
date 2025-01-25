import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

// Debug log for API URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
console.log('API URL:', apiUrl);

const httpLink = createHttpLink({
  uri: `${apiUrl}/graphql`,
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
  },
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Handle authentication errors
      if (message === 'Not authenticated') {
        Cookies.remove(TOKEN_KEY, { path: '/' });
        window.location.href = '/auth/login';
      }
    });
  }
  if (networkError) {
    console.error(`[Network error]:`, networkError);
    // Log detailed network error
    if ('statusCode' in networkError) {
      console.error(`Status code: ${networkError.statusCode}`);
    }
    if ('response' in networkError) {
      console.error('Response:', networkError.response);
    }
  }
});

// Auth link for adding token to headers
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(TOKEN_KEY);
  console.log('Current token:', token); // Debug log
  console.log('Current headers:', headers); // Debug log
  
  const updatedHeaders = {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  
  console.log('Updated headers:', updatedHeaders); // Debug log
  
  return {
    headers: updatedHeaders,
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    }
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client; 