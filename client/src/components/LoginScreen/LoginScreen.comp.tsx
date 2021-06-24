import { Button, Card, Form, Input, Layout, Typography } from 'antd';
import { useAppDispatch } from 'store';
import { adminActions } from 'store/adminSlice';

import styles from './LoginScreen.module.css';

const { Title, Text } = Typography;
const { Item } = Form;
const { Password } = Input;

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const onFinish = () => {
    dispatch(adminActions.setIsLoggedIn(true));
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

        <Text type="secondary">Hint: demo/demo</Text>
      </Card>
    </Layout>
  );
};

export default LoginScreen;
