import { Layout, Result, Button } from 'antd';
import MainHeader from 'components/MainHeader';
import MainSider from 'components/MainSider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store';

import styles from './MainLayout.module.css';

const SIDER_WIDTH = 200;
const HEADER_HEIGHT = 64;

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  const isAuthorized = useAppSelector((state) => state.admin.isAuthorized);
  const collapseState = useState(false);
  const router = useRouter();
  const [collapsed] = collapseState;

  if (router.pathname !== '/' && !isAuthorized) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link href="/">
              <a>Go To Login Page</a>
            </Link>
          </Button>
        }
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <Layout className={styles.container}>
      <MainSider
        collapseState={collapseState}
        width={SIDER_WIDTH}
        logoContainerHeight={HEADER_HEIGHT}
      />

      <Layout
        className={styles.contentContainer}
        style={{ marginLeft: collapsed ? 80 : SIDER_WIDTH }}
      >
        <MainHeader
          style={{
            width: `calc(100% - ${collapsed ? 80 : SIDER_WIDTH}px)`,
            height: HEADER_HEIGHT,
          }}
        />

        <Layout
          className={styles.layoutContent}
          style={{
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            marginTop: HEADER_HEIGHT,
          }}
          data-testid="MainLayout.content-layout"
        >
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
