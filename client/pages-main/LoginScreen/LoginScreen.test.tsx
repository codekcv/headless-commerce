import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from 'utils/test-utils';

import LoginScreen from './LoginScreen.comp';
import { ADMIN_GET_LOGIN_INFO, ADMIN_LOGIN } from './LoginScreen.const';

test('query and show demo admin info', async () => {
  const mocks = [
    {
      request: {
        query: ADMIN_GET_LOGIN_INFO,
      },
      result: {
        data: {
          adminGetLoginInfo: {
            username: 'usernameMock',
            password: 'passwordMock',
          },
        },
      },
    },
  ];

  customRender(<LoginScreen />, { mocks });

  const loadingState = screen.getByText(/"connected": false/);
  expect(loadingState).toBeInTheDocument();

  const username = await screen.findByText(/usernameMock/);
  expect(username).toBeInTheDocument();

  const password = screen.getByText(/passwordMock/);
  expect(password).toBeInTheDocument();
});

test('can fill up form and login', async () => {
  const mockDemo = { username: 'demo', password: 'demo' };

  const mocks = [
    {
      request: {
        query: ADMIN_GET_LOGIN_INFO,
      },
      result: {
        data: {
          adminGetLoginInfo: {
            username: 'usernameMock',
            password: 'passwordMock',
          },
        },
      },
    },
    {
      request: {
        query: ADMIN_LOGIN,
        variables: mockDemo,
      },
      result: {
        data: mockDemo,
      },
    },
  ];

  customRender(<LoginScreen />, { mocks });

  const loginForm = screen.getByRole('heading', {
    name: '[WIP] Admin Panel',
    level: 4,
  });

  expect(loginForm).toBeInTheDocument();

  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Submit' });

  userEvent.type(usernameInput, 'usernameMock');
  userEvent.type(passwordInput, 'passwordMock');
  userEvent.click(submitButton);

  await waitFor(() => expect(submitButton).toBeDisabled());
});
