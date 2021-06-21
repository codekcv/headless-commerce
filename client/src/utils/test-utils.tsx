/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'store';

const AllTheProviders: FC = ({ children }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export default customRender;
