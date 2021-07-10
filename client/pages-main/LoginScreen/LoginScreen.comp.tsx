import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Form,
  Layout,
  message,
  notification,
  Typography,
} from 'antd';
import FormItem from 'components/form/FormItem';
import { useRouter } from 'next/router';
import { uri } from 'pages/_app';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  setRefreshTokenCookie,
  startAutoRefresh,
} from 'utils/refreshTokenCookie';

import { useAppDispatch, useAppSelector } from '../../store';
import { adminActions } from '../../store/adminSlice';
import { ADMIN_LOGIN, FormValues, HELLO, schema } from './LoginScreen.const';
import styles from './LoginScreen.module.css';

const MODAL_KEY = 'login';
const NOTIFICATION_KEY = 'connect';

const LoginScreen = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogin] = useMutation(ADMIN_LOGIN);
  const { error, data } = useQuery(HELLO);
  const isConnected = useAppSelector((state) => state.admin.isConnected);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const isAuthorized = useAppSelector((state) => state.admin.isAuthorized);

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
      const res = await adminLogin({ variables: { username, password } });
      const { accessToken, refreshToken } = JSON.parse(res.data);

      dispatch(adminActions.setAccessToken(accessToken));
      setRefreshTokenCookie(refreshToken);
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
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      if (data) {
        notification.success({
          message: 'Connected!',
          key: NOTIFICATION_KEY,
          duration: 2,
        });

        dispatch(adminActions.setIsConnected(true));
      } else {
        notification.warning({
          message: 'Connecting to backend...',
          key: NOTIFICATION_KEY,
          duration: null,
        });
      }
    }
  }, [data, dispatch, isConnected]);

  useEffect(() => {
    if (isAuthorized) {
      router.push('/dashboard');
      startAutoRefresh(dispatch, uri);
    }
  }, [dispatch, isAuthorized, router]);

  if (error) {
    return <p>{`Error! ${error.message}`}</p>;
  }

  return (
    <Layout className={styles.layout}>
      <Card className={styles.card}>
        <Typography.Title
          className={styles.title}
          level={4}
          style={{ textAlign: 'center' }}
        >
          [WIP] Admin Panel
        </Typography.Title>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ width: 320 }}
          >
            <FormItem
              name="username"
              label="Username"
              placeholder="Enter username: demo1user"
              disabled={!isMounted}
            />

            <FormItem
              name="password"
              label="Password"
              inputType="Password"
              placeholder="Enter password: demo1pass"
              disabled={!isMounted}
            />

            <Form.Item className={styles.item}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </form>
        </FormProvider>

        <Typography.Text type="secondary">
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
                status: data ? 'connected' : 'connecting',
                env: process.env.NODE_ENV,
                api: `${uri}/graphql`,
              },
              undefined,
              2
            )}
          </pre>
        </Typography.Text>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
