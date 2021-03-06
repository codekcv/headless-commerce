import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginScreen, {
  ADMIN_GET_LOGIN_INFO,
  ADMIN_LOGIN,
} from 'components/LoginScreen/LoginScreen.comp';
import customRender from 'utils/test-utils';

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

  const loadingState = screen.getByText(/"fetching": true/);
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

  userEvent.type(usernameInput, 'demo');
  userEvent.type(passwordInput, 'demo');

  await waitFor(() => userEvent.click(submitButton));
  expect(submitButton).toBeDisabled();
});
