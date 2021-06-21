import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Layout, Typography } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';

import styles from './MainHeader.module.css';

const ICON_SIZE = 18;
const { Header } = Layout;
const { Text } = Typography;

const MainHeader = (props: BasicProps): JSX.Element => (
  <Header className={styles.header} {...props}>
    <div className={styles.leftSide}>Left</div>

    <div className={styles.rightSide}>
      <Badge className={styles.item} count={5} offset={[4, -4]}>
        <BellOutlined style={{ fontSize: ICON_SIZE }} />
      </Badge>

      <SettingOutlined
        className={styles.item}
        style={{ fontSize: ICON_SIZE }}
      />

      <Avatar className={styles.item} size={32} icon={<UserOutlined />} />
      <Text className={styles.item}>Admin 01</Text>
    </div>
  </Header>
);

export default MainHeader;
