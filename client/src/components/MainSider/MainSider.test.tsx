import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { menuItems } from 'App.const';
import MainLayout from 'components/MainLayout';
import customRender from 'utils/test-utils';

test('sider can be collapsed and expanded', async () => {
  await waitFor(() => {
    customRender(<MainLayout>{menuItems}</MainLayout>);
  });

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
