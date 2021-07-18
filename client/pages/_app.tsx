import '../styles/globals.css';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AccessProvider from 'components/AccessProvider/AccessProvider';
import MainLayout from 'components/MainLayout';
import MenuPath from 'components/MenuPath';
import fetch from 'cross-fetch';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider as ReduxProvider } from 'react-redux';
import { getMemoryToken } from 'utils/refreshTokenCookie';

import store from '../store';

export const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const httpLink = createHttpLink({
  uri: `${uri}/graphql`,
  credentials: 'include',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getMemoryToken();

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <AccessProvider>
          {pathname === '/' ? (
            <Component {...pageProps} />
          ) : (
            <MainLayout>
              <MenuPath component={<Component {...pageProps} />} />
            </MainLayout>
          )}
        </AccessProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default MyApp;
