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
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string): JSX.Element => <a href="/">{name}</a>,
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
    title: 'Product ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: string): string => id,
  },
  {
    title: 'Action',
    key: 'action',
    render: (): JSX.Element => (
      <Space size="middle">
        <a href="/">Invite</a>
        <a href="/">Delete</a>
      </Space>
    ),
  },
];
