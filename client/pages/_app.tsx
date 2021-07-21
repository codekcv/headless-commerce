import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import AccessProvider from 'components/AccessProvider/AccessProvider.main';
import MainLayout from 'components/MainLayout';
import MenuPath from 'components/MenuPath';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider as ReduxProvider } from 'react-redux';
import { client } from 'utils/apolloClient';

import store from '../store';

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
