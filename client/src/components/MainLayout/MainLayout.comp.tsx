import { Layout, Menu } from 'antd';
import Dashboard from 'menus/Dashboard';
import { useState } from 'react';
import styles from './MainLayout.module.css';

const SIDER_WIDTH = 200;
const HEADER_HEIGHT = 64;
const { Sider, Header } = Layout;
const { Item, SubMenu } = Menu;

const menus = [{ title: 'Dashboard', component: <Dashboard /> }];

const MainLayout = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.container}>
      <Sider
        className={styles.sider}
        width={SIDER_WIDTH}
        collapsible
        collapsed={collapsed}
        onCollapse={(e: boolean) => setCollapsed(e)}
      >
        <Menu theme="dark">
          <Item>Dashboard</Item>

          <SubMenu title="Customers">
            <Item>Customers</Item>
          </SubMenu>

          <Item>Reviews</Item>
        </Menu>
      </Sider>

      <Layout
        className={styles.layout}
        style={{ marginLeft: collapsed ? 80 : SIDER_WIDTH }}
      >
        <Header
          className={styles.header}
          style={{
            width: `calc(100% - ${collapsed ? 80 : SIDER_WIDTH}px)`,
            height: HEADER_HEIGHT,
          }}
        >
          Admin Panel POC
        </Header>

        <Layout
          className={styles.layoutMenu}
          style={{
            padding: `${HEADER_HEIGHT + 32}px 32px 0`,
          }}
        >
          <Dashboard />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
