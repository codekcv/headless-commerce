import { gql } from '@apollo/client';
import { Space } from 'antd';

export const ITEM_GET_MANY = gql`
  {
    itemGetMany {
      id
      name
      description
    }
  }
`;

export const columns = [
  {
    title: 'Product ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: string): string => id,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string): string => name,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description: string): string => description,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: string): string => price,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: string, record: any): JSX.Element => (
      <Space size="middle">
        <a href="/">Invite {record.name}</a>
        <a href="/">Delete</a>
      </Space>
    ),
  },
];
