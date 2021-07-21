import { useQuery } from '@apollo/client';
import { Card, Col, Layout, message, Row, Table } from 'antd';
import {
  columns,
  CUSTOMER_GET_MANY,
} from 'pages-main/client/Customers/Customers.util';
import { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppDispatch, useAppSelector } from 'store';

import ChartContainer from './ChartContainer/ChartContainer.main';
import styles from './Dashboard.module.css';
import { dashboardActions } from './Dashboard.slice';
import { chartDummyData } from './Dashboard.util';

const GRID_GAP = 16;
const { Content } = Layout;

const Dashboard = (): JSX.Element => {
  const { data } = useQuery(CUSTOMER_GET_MANY);
  const dispatch = useAppDispatch();

  const isFromLoginScreen = useAppSelector(
    (state) => state.dashboard.isFromLoginScreen
  );

  const isDoneShowLoginFeedback = useAppSelector(
    (state) => state.dashboard.isDoneShowLoginFeedback
  );

  useEffect(() => {
    if (isFromLoginScreen && !isDoneShowLoginFeedback) {
      message.success({
        content: 'Logged in succesfully!',
        key: 'login',
        duration: 2,
      });

      dispatch(dashboardActions.setIsDoneShowLoginFeedback(true));
    }
  }, [dispatch, isDoneShowLoginFeedback, isFromLoginScreen]);

  return (
    <Content className={styles.container}>
      <Row className={styles.row} gutter={GRID_GAP}>
        <Col span={24}>
          <Card
            title="Test Card Title"
            bodyStyle={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>
              Hello, this is just a demo of a CRM Admin Panel created by
              Christian Villamin.
            </p>

            <p>
              Technology Stack: React, Redux, Recharts, React Hook Form, CSS
              Modules, GraphQL, Apollo Client.
              <br />
              <br />
              GitHub:&nbsp;
              <a href="https://github.com/codekcv/admin-panel">admin-panel</a>
            </p>
          </Card>
        </Col>
      </Row>

      <Row className={styles.row} gutter={GRID_GAP}>
        <Col span={12}>
          <Card
            title="30 Day Revenue History X"
            headStyle={{ border: 'none' }}
            hoverable
          >
            <ChartContainer height={380}>
              <LineChart
                data={chartDummyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  animationDuration={500}
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#82ca9d"
                  animationDuration={500}
                />
              </LineChart>
            </ChartContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="30 Day Revenue History Y"
            headStyle={{ border: 'none' }}
            hoverable
          >
            <ChartContainer height={380}>
              <BarChart
                data={chartDummyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" animationDuration={500} />
                <Bar dataKey="uv" fill="#82ca9d" animationDuration={500} />
              </BarChart>
            </ChartContainer>
          </Card>
        </Col>
      </Row>

      <Row className={styles.row} gutter={GRID_GAP}>
        <Col span={24}>
          <Card title="Recent Transactions">
            <Table
              dataSource={data?.customerGetMany ?? []}
              rowKey="id"
              columns={columns}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
