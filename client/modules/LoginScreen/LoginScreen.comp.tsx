import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  message,
  notification,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { adminActions } from '../../store/adminSlice';
import rmvTypename from '../../utils/rmvTypename';

import styles from './LoginScreen.module.css';

const MODAL_KEY = 'login';
const NOTIFICATION_KEY = 'connect';
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

const uri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const openNotificationWithIcon = (type: any) => {
  if (type === 'warning') {
    notification.warning({
      message: 'Connecting to backend...',
      key: NOTIFICATION_KEY,
      duration: null,
    });
  } else {
    notification.success({
      message: 'Connected!',
      key: NOTIFICATION_KEY,
      duration: 2,
    });
  }
};

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { error, data } = useQuery(ADMIN_GET_LOGIN_INFO);
  const [adminLogin] = useMutation(ADMIN_LOGIN);
  const isConnected = useAppSelector((state) => state.admin.isConnected);
  const router = useRouter();

  const onFinish = async (e: any) => {
    setIsLoading(true);

    message.loading({
      content: 'Logging in...',
      key: MODAL_KEY,
      duration: null,
    });

    try {
      const { username, password } = e;

      await adminLogin({ variables: { username, password } });

      dispatch(adminActions.setIsLoggedIn(true));
      router.push('/dashboard', undefined, { shallow: true });
    } catch (err) {
      message.error({
        content: `Error: ${err}`,
        key: MODAL_KEY,
        duration: 2,
      });

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      if (data) {
        openNotificationWithIcon('success');
        dispatch(adminActions.setIsConnected(true));
      } else {
        openNotificationWithIcon('warning');
      }
    }
  }, [data, dispatch, isConnected]);

  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <Layout className={styles.layout}>
      <Card className={styles.card}>
        <Title
          className={styles.title}
          level={4}
          style={{ textAlign: 'center' }}
        >
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
            <Input placeholder="Enter Username: demo1user" />
          </Item>

          <Item
            className={styles.item}
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Password placeholder="Enter Password: demo1pass" />
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
          <pre
            style={{
              display: 'grid',
              alignItems: 'center',
              width: 320,
              height: 200,
            }}
          >
            {JSON.stringify(
              {
                connected: !!data,
                username: data?.adminGetLoginInfo?.username ?? '...',
                password: data?.adminGetLoginInfo?.password ?? '...',
                env: process.env.NODE_ENV,
                api: uri,
              },
              undefined,
              2
            )}
          </pre>
        </Text>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
