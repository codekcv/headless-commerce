import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button, Card, Form, Input, Layout, Typography } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from 'store';
import { adminActions } from 'store/adminSlice';

import styles from './LoginScreen.module.css';

const { Title, Text } = Typography;
const { Item } = Form;
const { Password } = Input;

const ADMIN_GET = gql`
  {
    adminGet {
      username
      password
    }
  }
`;

const ADMIN_LOGIN = gql`
  mutation {
    adminLogin(username: "codekcv", password: "plaintext")
  }
`;

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [adminGet, { loading, error, data, called }] = useLazyQuery(ADMIN_GET);
  const [login, { data: result }] = useMutation(ADMIN_LOGIN);

  const onFinish = () => {
    dispatch(adminActions.setIsLoggedIn(true));
  };

  useEffect(() => {
    login();
  }, [login]);

  useEffect(() => {
    if (result) adminGet();
  }, [adminGet, result]);

  if (error) return <p>{`Error! ${error.message}`}</p>;

  const isLoading = !called || loading;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rmvTypename = (obj: any) => {
    const newObj = { ...obj };
    delete newObj.__typename;
    return newObj;
  };

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
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Item>
        </Form>

        <Text type="secondary">
          <pre style={{ display: 'grid', alignItems: 'center', height: 110 }}>
            {JSON.stringify(
              isLoading ? {} : rmvTypename(data.adminGet),
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
