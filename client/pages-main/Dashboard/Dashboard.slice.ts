/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DashboardState = {
  isFromLoginScreen: boolean;
  isDoneShowLoginFeedback: boolean;
};

const initialState: DashboardState = {
  isFromLoginScreen: false,
  isDoneShowLoginFeedback: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsFromLoginScreen: (state, { payload }: PayloadAction<boolean>) => {
      state.isFromLoginScreen = payload;
    },
    setIsDoneShowLoginFeedback: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isDoneShowLoginFeedback = payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
