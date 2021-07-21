import '@testing-library/jest-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from 'utils/test-utils';

import LoginScreen from './LoginScreen.main';
import { ADMIN_LOGIN } from './LoginScreen.util';

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
    name: 'Headless Commerce',
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
