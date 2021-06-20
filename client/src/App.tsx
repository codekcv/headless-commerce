import MainLayout from 'components/MainLayout/MainLayout.comp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import menus from 'menus/menus';
import MenuPath from 'components/MainLayout/MenuPath';
import formatPathCrumb from 'utils/formatPathCrumb';

const App = (): JSX.Element => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          {menus.map((route) => {
            if (route?.component) {
              const mainMenu = (
                <Route key={route.path} path={route.path} exact>
                  <MenuPath path={formatPathCrumb(route.path)}>
                    {route.component}
                  </MenuPath>
                </Route>
              );

              return mainMenu;
            }

            const subMenu = route.subroutes.map((subroute) => {
              const path = `${route.path}${subroute.path}`;

              return (
                <Route key={path} path={path} exact>
                  <MenuPath path={formatPathCrumb(path)}>
                    {subroute.component}
                  </MenuPath>
                </Route>
              );
            });

            return subMenu;
          })}
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default App;
