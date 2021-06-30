import { Input, Layout, Space } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';

import Logout from './Logout';
import styles from './MainHeader.module.css';
import Notification from './Notification';
import Settings from './Settings';

const { Header } = Layout;

const MainHeader = (props: BasicProps): JSX.Element => {
  return (
    <Header className={styles.header} {...props}>
      <Input
        placeholder="Search..."
        style={{ width: '100%', marginRight: 24 }}
      />

      <Space className={styles.rightSide} size="large" align="center">
        <Notification />
        <Settings />
        <Logout />
      </Space>
    </Header>
  );
};

export default MainHeader;
