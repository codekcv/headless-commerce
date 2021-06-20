import { Card, Col, Row } from 'antd';
import styles from './Dashboard.module.css';

const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <Card
            title="The Pique Lab CRM Proof of Concept"
            hoverable
            bodyStyle={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ width: '50%' }}>
              Hello, this is just a demo of a CRM Admin Dashboard created by
              Christian Villamin.
            </p>

            <div style={{ width: '50%' }}>
              <p>
                Technology Stack: React, Redux, Recharts, GraphQL, Apollo
                Client, Apollo Server, Performant CSS-in-JS (
                <a href="https://stitches.dev/">stitches.dev</a>),
              </p>

              <p>kk</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
