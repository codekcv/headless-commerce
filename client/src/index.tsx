/* eslint-disable no-console */
import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';

import App from './App';
import reportWebVitals from './reportWebVitals';

const uri =
  process.env.NODE_ENV === 'development'
    ? 'https://kcv-server-test.herokuapp.com/'
    : process.env.URI;

console.log(0, process.env.NODE_ENV);
console.log(1, process.env.URI);

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
const httpLink = new HttpLink({ uri });

const cleanTypeName = new ApolloLink((operation, forward) => {
  console.log(33, operation);
  if (operation.variables) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const omitTypename = (key: string, value: any) => {
      console.log(key, value);
      return key === '__typename' ? undefined : value;
    };

    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map((data) => data);
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const httpLinkWithErrorHandling = ApolloLink.from([cleanTypeName, httpLink]);
*/
