import { Layout, Card, Col, Row } from 'antd';
import styles from './Dashboard.module.css';

const GRID_GAP = 16;
const { Content } = Layout;

const Dashboard = (): JSX.Element => {
  return (
    <Content className={styles.container}>
      <Row className={styles.row} gutter={GRID_GAP}>
        <Col span={12}>
          <Card
            title="The Pique Lab CRM Proof of Concept"
            bodyStyle={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>
              Hello, this is just a demo of a CRM Admin Dashboard created by
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

        <Col span={12}>
          <Card
            title="The Pique Lab CRM Proof of Concept"
            bodyStyle={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>
              Hello, this is just a demo of a CRM Admin Dashboard created by
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
    </Content>
  );
};

export default Dashboard;
