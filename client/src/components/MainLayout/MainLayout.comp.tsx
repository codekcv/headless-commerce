import { Layout, Menu } from 'antd';
import menus from 'menus/menus';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainLayout.module.css';

const SIDER_WIDTH = 200;
const HEADER_HEIGHT = 64;
const { Sider, Header } = Layout;
const { Item, SubMenu } = Menu;

type Props = {
  children: ReactNode;
};

const menuItems = menus.map((menu) => {
  if (menu?.subroutes) {
    return (
      <SubMenu key={menu.title} icon={menu.icon} title={menu.title}>
        {menu.subroutes.map((subroute) => {
          return (
            <Item key={subroute.title} icon={subroute.icon}>
              <Link to={`${menu.path}${subroute.path}`}>{subroute.title}</Link>
            </Item>
          );
        })}
      </SubMenu>
    );
  }

  return (
    <Item key={menu.title} icon={menu.icon}>
      <Link to={menu.path}>{menu.title}</Link>
    </Item>
  );
});

const defaultOpenKeys = menus
  .filter((menu) => !!menu?.subroutes)
  .map((menu) => menu.title);

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
        <div className={styles.logo} style={{ height: HEADER_HEIGHT }}>
          <h1>Admin Panel POC</h1>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[menus[0].title]}
          defaultOpenKeys={defaultOpenKeys}
        >
          {menuItems}
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
        />

        <Layout
          className={styles.layoutMenu}
          style={{
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            marginTop: HEADER_HEIGHT,
          }}
        >
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
