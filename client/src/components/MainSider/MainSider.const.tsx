import { Menu } from 'antd';
import menus from 'menus/menus';
import { Link } from 'react-router-dom';

const { Item, SubMenu } = Menu;

export const menuItems = menus.map((menu) => {
  if (!menu?.subroutes) {
    const mainItem = (
      <Item key={menu.title} icon={menu.icon}>
        <Link role="link" to={menu.path}>
          {menu.title}
        </Link>
      </Item>
    );

    return mainItem;
  }

  const subItems = (
    <SubMenu key={menu.title} icon={menu.icon} title={menu.title}>
      {menu.subroutes.map((subroute) => {
        return (
          <Item key={subroute.title} icon={subroute.icon}>
            <Link to={`${menu.path}${subroute.path}`}>{subroute.title}</Link>
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
