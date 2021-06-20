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
        <Menu mode="inline" theme="dark">
          {menus.map((item) => {
            if (item?.subroutes) {
              return (
                <SubMenu key={item.title} icon={item.icon} title={item.title}>
                  {item.subroutes.map((subroute) => {
                    return (
                      <Item key={subroute.title} icon={subroute.icon}>
                        <Link to={`${item.path}${subroute.path}`}>
                          {subroute.title}
                        </Link>
                      </Item>
                    );
                  })}
                </SubMenu>
              );
            }

            return (
              <Item key={item.title} icon={item.icon}>
                <Link to={item.path}>{item.title}</Link>
              </Item>
            );
          })}
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
            padding: `${HEADER_HEIGHT + 40}px 32px 0`,
            border: '1px solid red',
          }}
        >
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
