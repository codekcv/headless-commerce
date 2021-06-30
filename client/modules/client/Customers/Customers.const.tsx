import { gql } from '@apollo/client';
import { Space } from 'antd';
import Link from 'next/link';

export const CUSTOMER_GET_MANY = gql`
  {
    customerGetMany {
      id
      username
      firstName
      lastName
      age
      email
      password
    }
  }
`;

export const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (username: string) => <Link href="/">{username}</Link>,
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (firstName: string): string => firstName,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (lastName: string): string => lastName,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render: (age: number): number => age,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email: string): string => email,
  },
  {
    title: 'Customer ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: string): string => id,
  },
  {
    title: 'Action',
    key: 'action',
    render: (): JSX.Element => (
      <Space size="middle">
        <Link href="/">Edit</Link>
        <Link href="/">Delete</Link>
      </Space>
    ),
  },
];
