import { configureStore } from '@reduxjs/toolkit';
import MainLayoutSlice from 'components/MainLayout/MainLayout.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import adminSlice from './adminSlice';

const store = configureStore({
  reducer: {
    admin: adminSlice,
    layout: MainLayoutSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
