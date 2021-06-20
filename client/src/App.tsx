import MainLayout from 'components/MainLayout/MainLayout.comp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import menus from 'menus/menus';
import MenuPath from 'components/MenuPath';
import formatPathCrumb from 'utils/formatPathCrumb';

const menuItems = menus.map((route) => {
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

const App = (): JSX.Element => (
  <Router>
    <Redirect to="/dashboard" />

    <MainLayout>
      <Switch>{menuItems}</Switch>
    </MainLayout>
  </Router>
);

export default App;
