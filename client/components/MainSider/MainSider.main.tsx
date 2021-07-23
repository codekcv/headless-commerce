/* eslint-disable @next/next/no-img-element */
import { Layout, Menu } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';
import { layoutActions } from 'components/MainLayout/MainLayout.slice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logoImg from 'public/logo.svg';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useAppDispatch } from 'store';

import styles from './MainSider.module.css';
import { defaultOpenKeys, menuItems } from './MainSider.util';

type Props = BasicProps & {
  collapseState: [boolean, Dispatch<SetStateAction<boolean>>];
  width: number;
  logoContainerHeight: number;
};

const MainSider = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { collapseState, width, logoContainerHeight } = props;
  const [collapsed, setCollapsed] = collapseState;
  const { pathname } = useRouter();
  const titleRef = useRef('');

  const onCollapse = (e: boolean) => {
    setCollapsed(e);
    dispatch(layoutActions.setIsSiderMoving(true));

    setTimeout(() => {
      dispatch(layoutActions.setIsSiderMoving(false));
    }, 300);
  };

  if (!titleRef.current) {
    const title = pathname.split('/').splice(-1)[0];
    const defaultSelectedKey = `${title[0].toUpperCase()}${title.slice(1)}`;

    titleRef.current = defaultSelectedKey;
  }

  return (
    <Layout.Sider
      className={styles.sider}
      width={width}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div
        className={styles.logoContainer}
        style={{ height: logoContainerHeight }}
      >
        <span
          className={styles.logoPos}
          style={{
            marginLeft: collapsed ? 16 : 8,
          }}
        >
          <Image
            className={styles.logo}
            src={logoImg}
            width={48}
            height={48}
            alt="logo"
            placeholder="blur"
          />
        </span>

        <h1
          className={styles.logoTitle}
          style={{
            opacity: collapsed ? 0 : 1,
            left: collapsed ? 68 : 56,
          }}
        >
          Admin Panel
        </h1>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={[titleRef.current]}
        defaultOpenKeys={defaultOpenKeys}
      >
        {menuItems}
      </Menu>
    </Layout.Sider>
  );
};

export default MainSider;
