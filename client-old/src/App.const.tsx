import MenuPath from 'components/MenuPath';
import menus from 'menus/menus';
import { Route } from 'react-router-dom';
import formatPathCrumb from 'utils/formatPathCrumb';

export const menuItems = menus.map((route) => {
  if (route?.component) {
    const mainMenu = (
      <Route
        exact
        key={route.path}
        path={route.path}
        render={() => (
          <MenuPath
            path={formatPathCrumb(route.path)}
            component={route.component}
          />
        )}
      />
    );

    return mainMenu;
  }

  const subMenu = route.subroutes.map((subroute) => {
    const path = `${route.path}${subroute.path}`;

    return (
      <Route
        exact
        key={path}
        path={path}
        render={() => (
          <MenuPath
            path={formatPathCrumb(path)}
            component={subroute.component}
          />
        )}
      />
    );
  });

  return subMenu;
});
