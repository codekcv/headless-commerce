import '../styles/globals.css';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import MainLayout from 'components/MainLayout';
import MenuPath from 'components/MenuPath';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { adminActions } from 'store/adminSlice';
import { getRefreshTokenCookie } from 'utils/refreshTokenCookie';

import store, { useAppDispatch, useAppSelector } from '../store';

export const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const httpLink = createHttpLink({
  uri: `${uri}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = useAppSelector((state) => state.admin.accessToken);

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.admin.isAuthorized);

  useEffect(() => {
    const refreshToken = getRefreshTokenCookie();

    if (refreshToken && !isAuthorized) {
      const getAccessToken = async () => {
        const res = await fetch(`${uri}/refresh_token`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (res) {
          const newAccessToken = await res.json();

          dispatch(adminActions.setAccessToken(newAccessToken));
          dispatch(adminActions.setIsAuthorized(true));
          dispatch(adminActions.setIsLoggedIn(true));
        } else {
          // Refresh Token is expired or invalidated.
          document.cookie =
            'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      };

      getAccessToken();
    }
  }, [dispatch, isAuthorized]);

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        {router.pathname === '/' ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout>
            <MenuPath component={<Component {...pageProps} />} />
          </MainLayout>
        )}
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default MyApp;
