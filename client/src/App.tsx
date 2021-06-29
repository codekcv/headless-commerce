import { menuItems } from 'App.const';
import LoginScreen from 'components/LoginScreen';
import MainLayout from 'components/MainLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useAppSelector } from 'store';
import { adminActions } from 'store/adminSlice';

const { firstLoginDone } = adminActions;

const App = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.admin.isLoggedIn);
  const isFirstTime = useAppSelector((state) => state.admin.isFirstTime);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && isFirstTime) {
      dispatch(firstLoginDone(false));
    }
  }, [dispatch, isFirstTime, isLoggedIn]);

  if (!isLoggedIn || isFirstTime) {
    return <LoginScreen />;
  }

  return (
    <Router>
      <Redirect to="/dashboard" />

      <MainLayout>
        <Switch>{menuItems}</Switch>
      </MainLayout>
    </Router>
  );
};

export default App;
