import { Menu } from 'antd';
import Link from 'next/link';
import menus from 'utils/menus';

const { Item, SubMenu } = Menu;

export const menuItems = menus.map((menu) => {
  if (!menu?.subroutes) {
    const mainItem = (
      <Item
        key={menu.title}
        icon={menu.icon}
        disabled={menu?.disabled ?? false}
      >
        <Link href={menu.path}>{menu.title}</Link>
      </Item>
    );

    return mainItem;
  }

  const subItems = (
    <SubMenu key={menu.title} icon={menu.icon} title={menu.title}>
      {menu.subroutes.map((subroute) => {
        return (
          <Item
            key={subroute.title}
            icon={subroute.icon}
            disabled={subroute?.disabled ?? false}
          >
            <Link href={`${menu.path}${subroute.path}`}>{subroute.title}</Link>
          </Item>
        );
      })}
    </SubMenu>
  );

  return subItems;
});

export const defaultOpenKeys = menus
  .filter((menu) => !!menu?.subroutes)
  .map((menu) => menu.title);
