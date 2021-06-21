import { Layout, Menu } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';
import menus from 'menus/menus';
import { Dispatch, SetStateAction } from 'react';

import logo from '../../logo.svg';
import { defaultOpenKeys, menuItems } from './MainSider.const';
import styles from './MainSider.module.css';

const { Sider } = Layout;

type Props = BasicProps & {
  collapseState: [boolean, Dispatch<SetStateAction<boolean>>];
  width: number;
  logoContainerHeight: number;
};

const MainSider = (props: Props): JSX.Element => {
  const { collapseState, width, logoContainerHeight } = props;
  const [collapsed, setCollapsed] = collapseState;

  const onCollapse = (e: boolean) => {
    setCollapsed(e);
  };

  return (
    <Sider
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
        <img
          className={styles.logo}
          src={logo}
          width={48}
          alt="logo"
          style={{
            marginLeft: collapsed ? 16 : 8,
          }}
        />

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
        defaultSelectedKeys={[menus[0].title]}
        defaultOpenKeys={defaultOpenKeys}
      >
        {menuItems}
      </Menu>
    </Sider>
  );
};

export default MainSider;
