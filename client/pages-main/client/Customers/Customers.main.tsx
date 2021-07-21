import { useQuery } from '@apollo/client';
import { Layout, Table } from 'antd';

import { columns, CUSTOMER_GET_MANY } from './Customers.util';

const { Content } = Layout;

const Customers = (): JSX.Element => {
  const { data } = useQuery(CUSTOMER_GET_MANY);

  return (
    <Content>
      <Table
        dataSource={data?.customerGetMany ?? []}
        columns={columns}
        loading={!data}
        rowKey="id"
      />
    </Content>
  );
};

export default Customers;
