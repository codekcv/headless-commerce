import LoginScreen from 'components/LoginScreen';
import MainLayout from 'components/MainLayout/MainLayout.comp';
import MenuPath from 'components/MenuPath';
import menus from 'menus/menus';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useAppSelector } from 'store';
import { adminActions } from 'store/adminSlice';
import formatPathCrumb from 'utils/formatPathCrumb';

const { firstLoginDone } = adminActions;

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

const App = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.admin.isLoggedIn);
  const isFirstTime = useAppSelector((state) => state.admin.isFirstTime);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && isFirstTime) {
      dispatch(firstLoginDone());
    }
  }, [dispatch, isFirstTime, isLoggedIn]);

  if (!isLoggedIn || isFirstTime) {
    return <LoginScreen />;
  }

  return (
    <Router>
      {isFirstTime && <Redirect to="/dashboard" />}

      <MainLayout>
        <Switch>{menuItems}</Switch>
      </MainLayout>
    </Router>
  );
};

export default App;
