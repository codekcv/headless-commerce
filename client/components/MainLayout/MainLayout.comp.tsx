import { Layout } from 'antd';
import MainHeader from 'components/MainHeader';
import MainSider from 'components/MainSider';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import styles from './MainLayout.module.css';

const SIDER_WIDTH = 200;
const HEADER_HEIGHT = 64;

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props): JSX.Element => {
  const collapseState = useState(false);
  const [collapsed] = collapseState;
  const router = useRouter();

  if (router.pathname === '/') return <>{children}</>;

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
