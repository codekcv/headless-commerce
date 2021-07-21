/* eslint-disable no-console */
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
import { dashboardActions } from 'pages-main/Dashboard/Dashboard.slice';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../store';
import { adminActions } from '../../store/adminSlice';
import styles from './LoginScreen.module.css';
import { loginScreenActions } from './LoginScreen.slice';
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
  const isConnected = useAppSelector((state) => state.loginScreen.isConnected);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

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
      dispatch(dashboardActions.setIsFromLoginScreen(true));
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

        dispatch(loginScreenActions.setIsConnected(true));
        console.log('Repository: https://github.com/codekcv/headless-commerce');
        console.log(`// --- ${data.helloWorld}`);
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

  const isDisabled = !isMounted || isLoading;

  return (
    <Layout className={styles.layout}>
      <Card className={styles.card}>
        <Typography.Title className={styles.title} level={4}>
          Headless Commerce
        </Typography.Title>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem
              className={styles.username}
              name="username"
              label="Username"
              placeholder="Enter username: demo"
              disabled={isDisabled}
            />

            <FormItem
              name="password"
              label="Password"
              inputType="Password"
              placeholder="Enter password: demo"
              disabled={isDisabled}
            />

            <Form.Item className={styles.item}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={isDisabled}
              >
                Submit
              </Button>
            </Form.Item>
          </form>
        </FormProvider>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
