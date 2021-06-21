import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from 'utils/test-utils';

import App from './App';

test('renders login page and can sign in', async () => {
  customRender(<App />);

  // Expect login title.
  const loginForm = screen.getByRole('heading', {
    name: '[DEMO] Admin Panel',
    level: 4,
  });

  expect(loginForm).toBeInTheDocument();

  // Expect to fill form and submit.
  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Submit' });

  userEvent.type(usernameInput, 'demo');
  userEvent.type(passwordInput, 'demo');
  userEvent.click(submitButton);

  // Expect to get in main panel after submitting input.
  const adminPanel = await screen.findByRole('link', { name: 'Dashboard' });

  expect(adminPanel).toBeInTheDocument();
});
