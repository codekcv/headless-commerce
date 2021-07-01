import { Breadcrumb } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import formatPathCrumb from 'utils/formatPathCrumb';
import styles from './MenuPath.module.css';

type Props = {
  component: JSX.Element;
};

const MenuPath = ({ component }: Props): JSX.Element => {
  const { pathname } = useRouter();
  const paths = formatPathCrumb(pathname);

  return (
    <div>
      <Head>
        <title>{paths.map((path) => `${path} - `)}Headless Commerce</title>

        <meta
          name="description"
          content="An open-source headless commerce solution built with React, GraphQL, and serverless."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>Main</Breadcrumb.Item>

        {paths.map((breadcrumb) => (
          <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
        ))}
      </Breadcrumb>

      {component}
    </div>
  );
};

export default MenuPath;
