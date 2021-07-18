import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from 'utils/test-utils';

import LoginScreen from './LoginScreen.main';
import { ADMIN_LOGIN, HELLO_WORLD } from './LoginScreen.util';

test('can render and connect api', async () => {
  const mocks = [
    {
      request: {
        query: HELLO_WORLD,
      },
      result: {
        data: { helloWorld: 'Hello World' },
      },
    },
  ];

  customRender(<LoginScreen />, { mocks });

  const loadingState = screen.getByText(/"status": "connecting"/);
  expect(loadingState).toBeInTheDocument();

  await waitFor(() => document);

  const connectedState = await screen.findByText(/"status": "connected"/);
  expect(connectedState).toBeInTheDocument();
});

test('can fill up form and login', async () => {
  const mockDemo = { username: 'demo', password: 'demo' };

  const mocks = [
    {
      request: {
        query: ADMIN_LOGIN,
        variables: mockDemo,
      },
      result: {
        data: { adminLogin: mockDemo },
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
