/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { configureStore } from '@reduxjs/toolkit';
import MainLayoutSlice from 'components/MainLayout/MainLayout.slice';
import DashboardSlice from 'pages-main/Dashboard/Dashboard.slice';
import LoginScreenSlice from 'pages-main/LoginScreen/LoginScreen.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import adminSlice from './adminSlice';

const store = configureStore({
  reducer: {
    admin: adminSlice,
    layout: MainLayoutSlice,
    loginScreen: LoginScreenSlice,
    dashboard: DashboardSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
