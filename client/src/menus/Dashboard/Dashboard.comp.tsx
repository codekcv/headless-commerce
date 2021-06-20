import { Layout, Card, Col, Row } from 'antd';

const { Content } = Layout;

const Dashboard = (): JSX.Element => {
  return (
    <Content>
      <Row>
        <Col>
          <Card
            title="The Pique Lab CRM Proof of Concept"
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
                Technology Stack: React, Redux, Recharts, React Hook Form, CSS
                Modules, GraphQL, Apollo Client,
              </p>

              <p>
                GitHub:{' '}
                <a href="https://github.com/codekcv/admin-panel">admin-panel</a>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
