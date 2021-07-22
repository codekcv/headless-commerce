/* eslint-disable no-console */
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Form, Layout, message, Typography } from 'antd';
import FormItem from 'components/form/FormItem';
import { useRouter } from 'next/router';
import { dashboardActions } from 'pages-main/Dashboard/Dashboard.slice';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../store';
import { adminActions } from '../../store/adminSlice';
import styles from './LoginScreen.module.css';
import {
  ADMIN_LOGIN,
  FormValues,
  HELLO_WORLD,
  MODAL_KEY,
  schema,
} from './LoginScreen.util';

const LoginScreen = (): JSX.Element => {
  const { error, data } = useQuery(HELLO_WORLD);
  const [adminLogin] = useMutation(ADMIN_LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
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

  if (error) {
    return <p>{`Error! ${error.message}`}</p>;
  }

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
              disabled={isLoading}
            />

            <FormItem
              name="password"
              label="Password"
              inputType="Password"
              placeholder="Enter password: demo"
              disabled={isLoading}
            />

            <Form.Item className={styles.item}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={isLoading || !data}
              >
                Submit
              </Button>
            </Form.Item>
          </form>

          <Typography.Text type="secondary">
            {`Status: ${data ? 'Online' : 'Establishing connection...'}`}
          </Typography.Text>
        </FormProvider>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
