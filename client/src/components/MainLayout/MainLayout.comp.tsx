import { Layout } from 'antd';
import styles from './MainLayout.module.css';

const { Sider, Header, Content } = Layout;

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <Layout className={styles.container}>
      <Sider>X</Sider>

      <Layout>
        <Header>X</Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
