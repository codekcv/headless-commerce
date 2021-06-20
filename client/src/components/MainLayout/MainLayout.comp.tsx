import { Layout, Menu } from 'antd';
import Dashboard from 'menus/Dashboard';
import { useState } from 'react';
import styles from './MainLayout.module.css';

const SIDER_WIDTH = 200;
const { Sider, Header, Content } = Layout;
const { Item, SubMenu } = Menu;

type Props = {
  children: JSX.Element;
};

const menus = [{ title: 'Dashboard', component: <Dashboard /> }];

const MainLayout = ({ children }: Props): JSX.Element => {
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
          }}
        >
          X
        </Header>

        <div>
          <Dashboard />
        </div>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
