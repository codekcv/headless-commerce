import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Avatar, Badge, Input, Layout, Spin, Typography } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';

import styles from './MainHeader.module.css';

const ICON_SIZE = 18;
const { Header } = Layout;
const { Text } = Typography;

const ADMIN_GET = gql`
  {
    adminGet {
      username
      firstName
    }
  }
`;

const MainHeader = (props: BasicProps): JSX.Element => {
  const { data } = useQuery(ADMIN_GET);

  return (
    <Header className={styles.header} {...props}>
      <div className={styles.leftSide} style={{ width: '100%' }}>
        <Input placeholder="Search..." />
      </div>

      <div className={styles.rightSide}>
        <Badge className={styles.item} count={5} offset={[4, -4]}>
          <BellOutlined style={{ fontSize: ICON_SIZE }} />
        </Badge>

        <SettingOutlined
          className={styles.item}
          style={{ fontSize: ICON_SIZE }}
        />

        <Avatar className={styles.item} size={32} icon={<UserOutlined />} />

        <Text className={styles.item}>
          {data?.adminGet?.username ?? <Spin />}
        </Text>
      </div>
    </Header>
  );
};

export default MainHeader;
