import { useQuery } from '@apollo/client';
import { Layout, Table } from 'antd';

import { columns, ITEM_GET_MANY } from './Items.util';

const Items = (): JSX.Element => {
  const { data } = useQuery(ITEM_GET_MANY);

  return (
    <Layout.Content>
      <Table
        dataSource={data?.itemGetMany ?? []}
        columns={columns}
        loading={!data}
        rowKey="id"
      />
    </Layout.Content>
  );
};

export default Items;
