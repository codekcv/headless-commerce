import { gql, useQuery } from '@apollo/client';
import { Layout, Table } from 'antd';
import Link from 'next/link';

const columns = [
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    render: (reference: string) => reference,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (customer: any): JSX.Element => (
      <Link href="/">
        <a>{customer.username}</a>
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
    dataIndex: 'items',
    key: 'items',
    render: (items: any): string => items.length,
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
      reference
      customer {
        id
        username
      }
      address
      items {
        id
        name
        price
      }
      total
      orderDate
      status
    }
  }
`;

const Ordered = (): JSX.Element => {
  const { data } = useQuery(ORDER_GET_MANY);

  console.log(data);

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
