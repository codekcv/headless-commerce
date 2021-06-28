import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Card, Form, Input, Layout, Typography } from 'antd';
import { uri } from 'index';
import { useState } from 'react';
import { useAppDispatch } from 'store';
import { adminActions } from 'store/adminSlice';
import rmvTypename from 'utils/rmvTypename';

import styles from './LoginScreen.module.css';

const { Title, Text } = Typography;
const { Item } = Form;
const { Password } = Input;

export const ADMIN_GET_LOGIN_INFO = gql`
  {
    adminGetLoginInfo {
      username
      password
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password)
  }
`;

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { error, data } = useQuery(ADMIN_GET_LOGIN_INFO);
  const [adminLogin] = useMutation(ADMIN_LOGIN);

  const onFinish = async (e: any) => {
    setIsLoading(true);

    try {
      const { username, password } = e;

      await adminLogin({ variables: { username, password } });

      dispatch(adminActions.setIsLoggedIn(true));
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err);
    }

    setIsLoading(false);
  };

  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <Layout className={styles.layout}>
      <Card className={styles.card}>
        <Title className={styles.title} level={4}>
          [WIP] Admin Panel
        </Title>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={() => null}
          style={{ width: 320 }}
        >
          <Item
            className={styles.item}
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username.' }]}
          >
            <Input placeholder="Enter Username" />
          </Item>

          <Item
            className={styles.item}
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Password placeholder="Enter Password" />
          </Item>

          <Item className={styles.item}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Item>
        </Form>

        <Text type="secondary">
          <pre style={{ display: 'grid', alignItems: 'center', height: 110 }}>
            {JSON.stringify(
              !data ? { fetching: true } : rmvTypename(data.adminGetLoginInfo),
              undefined,
              2
            )}
          </pre>

          <pre style={{ display: 'grid', alignItems: 'center', height: 110 }}>
            {JSON.stringify(uri, undefined, 2)}
          </pre>
        </Text>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
