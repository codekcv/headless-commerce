import '../styles/globals.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MainLayout from 'components/MainLayout';
import MenuPath from 'components/MenuPath';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider as ReduxProvider } from 'react-redux';

import store from '../store';

const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        {pathname === '/' ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout>
            <MenuPath component={<Component {...pageProps} />} />
          </MainLayout>
        )}
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default MyApp;
