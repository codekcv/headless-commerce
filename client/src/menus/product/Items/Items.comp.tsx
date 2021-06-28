import { useQuery } from '@apollo/client';
import { Layout, Table } from 'antd';

import { columns, ITEM_GET_MANY } from './Items.const';

const { Content } = Layout;

const Items = (): JSX.Element => {
  const { data } = useQuery(ITEM_GET_MANY);

  return (
    <Content>
      <Table
        dataSource={data?.itemGetMany ?? []}
        columns={columns}
        loading={!data}
        rowKey="id"
      />
    </Content>
  );
};

export default Items;
