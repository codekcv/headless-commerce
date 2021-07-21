import { Card, Layout, Tabs } from 'antd';

import Cancelled from './Cancelled';
import Delivered from './Delivered';
import Ordered from './Ordered';

const Orders = (): JSX.Element => {
  return (
    <Layout.Content>
      <Card>
        <Tabs tabPosition="left">
          <Tabs.TabPane tab="Ordered" key="1">
            <Ordered />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Delivered" key="2">
            <Delivered />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Cancalled" key="3">
            <Cancelled />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Layout.Content>
  );
};

export default Orders;
