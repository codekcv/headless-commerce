import { screen } from '@testing-library/react';
import customRender from 'utils/test-utils';

import App from './App';

test('be able to see the login page at start', async () => {
  customRender(<App />);

  // Expect login title.
  const loginForm = screen.getByRole('heading', {
    name: '[WIP] Admin Panel',
    level: 4,
  });

  expect(loginForm).toBeInTheDocument();

  // For login component integration, see tests at "components/LoginScreen"
});
