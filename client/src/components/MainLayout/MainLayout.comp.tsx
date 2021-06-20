import { Layout, Menu } from 'antd';
import styles from './MainLayout.module.css';

const SIDER_WIDTH = 200;
const { Sider, Header, Content } = Layout;
const { Item, SubMenu } = Menu;

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <Layout className={styles.container}>
      <Layout.Sider className={styles.sider} width={SIDER_WIDTH} collapsible>
        <Menu theme="dark">
          <Item>Dashboard</Item>

          <SubMenu title="Customers">
            <Item>Customers</Item>
          </SubMenu>

          <Item>Reviews</Item>
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header>X</Layout.Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
