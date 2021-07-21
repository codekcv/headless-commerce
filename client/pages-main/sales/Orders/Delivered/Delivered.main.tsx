import { Layout, Table } from 'antd';
import faker from 'faker';
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
    render: (customer: string): JSX.Element => (
      <Link href="/">
        <a>{customer}</a>
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
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (quantity: string): string => quantity,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (total: string): string => total,
  },
];

const Delivered = (): JSX.Element => {
  return (
    <Layout.Content>
      <Table dataSource={[]} columns={columns} rowKey="id" />
    </Layout.Content>
  );
};

export default Delivered;
