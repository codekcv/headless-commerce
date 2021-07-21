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
import { uri } from 'pages/_app';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store';
import { adminActions } from '../../store/adminSlice';
import styles from './LoginScreen.module.css';
import {
  ADMIN_LOGIN,
  FormValues,
  HELLO_WORLD,
  schema,
} from './LoginScreen.util';

const MODAL_KEY = 'login';
const NOTIFICATION_KEY = 'connect';

const LoginScreen = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogin] = useMutation(ADMIN_LOGIN);
  const { error, data } = useQuery(HELLO_WORLD);
  const isConnected = useAppSelector((state) => state.admin.isConnected);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

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
      const accessToken = res.data.adminLogin;

      dispatch(adminActions.setAccessToken(accessToken));
      dispatch(adminActions.setIsAuthorized(true));
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
    if (isMounted && !isConnected) {
      if (data) {
        notification.success({
          message: 'Connected!',
          key: NOTIFICATION_KEY,
          duration: 2,
        });

        dispatch(adminActions.setIsConnected(true));
        console.log(data.helloWorld);
      } else {
        notification.warning({
          message: 'Connecting to backend...',
          key: NOTIFICATION_KEY,
          duration: null,
        });
      }
    }
  }, [data, dispatch, isConnected, isMounted]);

  if (error) {
    return <p>{`Error! ${error.message}`}</p>;
  }

  const network = data ? 'connected' : 'connecting';

  const status = {
    status: isMounted ? 'mounted' : 'hydrating',
    network: isMounted ? network : 'waiting',
    env: process.env.NODE_ENV,
    api: `${uri}`,
  };

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
            {JSON.stringify(status, undefined, 2)}
          </pre>
        </Typography.Text>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
