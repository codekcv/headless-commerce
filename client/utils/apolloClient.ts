import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

import { getMemoryToken } from './refreshTokenCookie';

export const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const credentials =
  process.env.NODE_ENV === 'development' ? 'same-origin' : 'include';

const httpLink = createHttpLink({
  credentials,
  uri,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getMemoryToken();

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken ?? ''}`,
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
