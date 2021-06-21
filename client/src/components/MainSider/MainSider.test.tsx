import { findByText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { menuItems } from 'App.const';
import MainLayout from 'components/MainLayout';
import menus from 'menus/menus';
import customRender from 'utils/test-utils';

beforeEach(async () => {
  await waitFor(() => {
    customRender(<MainLayout>{menuItems}</MainLayout>);
  });
});

test('sider can be collapsed and expanded', async () => {
  // Expect sider collapse/expand exists.
  const container = document.querySelector('.ant-layout-sider-trigger');
  expect(container).toBeInTheDocument();

  // Expect sider collapsed after click.
  if (container) userEvent.click(container);
  const collapsedSider = document.querySelector('.ant-layout-sider-collapsed');
  expect(collapsedSider).toBeInTheDocument();

  // Expect sider expanded after another click.
  if (container) userEvent.click(container);
  const expanded = document.querySelector('.ant-layout-sider-collapsed');
  expect(expanded).not.toBeInTheDocument();
});

test('sider can go to dashboard', async () => {
  const menuToFind = menus[0];
  const dashboard = await screen.findByRole('link', { name: menuToFind.title });

  expect(dashboard).toBeInTheDocument();

  if (dashboard) userEvent.click(dashboard);

  const main = await screen.findByTestId('MainLayout.content-layout');
  const x = await findByText(main, menuToFind.title);
  expect(x).toBeInTheDocument();
});
