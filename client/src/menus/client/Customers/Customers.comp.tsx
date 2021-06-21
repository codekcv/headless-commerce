import { Layout, Table } from 'antd';

import { columns, dataSource } from './Customers.const';

const { Content } = Layout;

const Customers = (): JSX.Element => (
  <Content>
    <Table dataSource={dataSource} columns={columns} />
  </Content>
);

export default Customers;
