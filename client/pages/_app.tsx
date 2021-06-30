import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store';
import MainLayout from 'components/MainLayout';
import MenuPath from 'components/MenuPath';

const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <MainLayout>
        <MenuPath component={<Component {...pageProps} />} />
      </MainLayout>
    </ReduxProvider>
  </ApolloProvider>
);

export default MyApp;
