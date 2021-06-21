import { Card, Col, Layout, Row } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './Dashboard.module.css';
import chartDummyData from './Dashboard.util';

const GRID_GAP = 16;
const { Content } = Layout;

const Dashboard = (): JSX.Element => {
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

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="30 Day Revenue History X"
            headStyle={{ border: 'none' }}
            hoverable
          >
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
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
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="30 Day Revenue History"
            headStyle={{ border: 'none' }}
            hoverable
          >
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
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
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
