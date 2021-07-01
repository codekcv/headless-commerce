import { useMutation, useQuery } from '@apollo/client';
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
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import { adminActions } from '../../store/adminSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import FormItem from 'components/form/FormItem';

import styles from './LoginScreen.module.css';
import {
  ADMIN_GET_LOGIN_INFO,
  ADMIN_LOGIN,
  FormValues,
  schema,
} from './LoginScreen.const';

const MODAL_KEY = 'login';
const NOTIFICATION_KEY = 'connect';
const { Title, Text } = Typography;
const { Item } = Form;

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
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogin] = useMutation(ADMIN_LOGIN);
  const { error, data } = useQuery(ADMIN_GET_LOGIN_INFO);
  const isConnected = useAppSelector((state) => state.admin.isConnected);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (e: FormValues) => {
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
      dispatch(adminActions.setIsAuthorized(true));

      router.push('/dashboard');
    } catch (err) {
      message.error({
        content: String(err),
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

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ width: 320 }}
          >
            <FormItem
              name="username"
              label="Username"
              placeholder="Enter username: demo1user"
            />

            <FormItem
              name="password"
              label="Password"
              inputType="Password"
              placeholder="Enter password: demo1pass"
            />

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
          </form>
        </FormProvider>

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
