import { gql, useQuery } from '@apollo/client';
import { Layout, Table } from 'antd';
import Link from 'next/link';

const columns = [
  {
    title: 'Reference ID',
    dataIndex: 'referenceId',
    key: 'referenceId',
    render: (referenceId: string) => referenceId,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: ({ username }: any): JSX.Element => (
      <Link href="/">
        <a>{username}</a>
      </Link>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (address: string): string => address,
  },
  {
    title: 'Total Items',
    dataIndex: 'itemsInOrder',
    key: 'items',
    render: (itemsInOrder: any): string => itemsInOrder.length,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (total: number): string => {
      return `$${total}`;
    },
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
    render: (orderDate: string): string => orderDate,
  },
];

const ORDER_GET_MANY = gql`
  {
    orderGetMany {
      id
      referenceId
      address
      total
      orderDate
      status

      customer {
        id
        username
      }

      itemsInOrder {
        id
      }
    }
  }
`;

const Ordered = (): JSX.Element => {
  const { data } = useQuery(ORDER_GET_MANY);

  return (
    <Layout.Content>
      <Table
        dataSource={data?.orderGetMany ?? []}
        columns={columns}
        loading={!data}
        rowKey="id"
      />
    </Layout.Content>
  );
};

export default Ordered;
