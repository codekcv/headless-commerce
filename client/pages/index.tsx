import Head from 'next/head';
import LoginScreen from 'modules/LoginScreen';

const Index = () => (
  <>
    <Head>
      <title>Headless Commerce</title>
      <meta
        name="description"
        content="An open-source headless commerce solution built with React, GraphQL, and serverless."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <LoginScreen />
  </>
);

export default Index;
