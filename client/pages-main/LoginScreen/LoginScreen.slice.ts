/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginScreenState = {
  isConnected: boolean;
};

const initialState: LoginScreenState = {
  isConnected: false,
};

const loginScreenSlice = createSlice({
  name: 'loginScreen',
  initialState,
  reducers: {
    setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
    },
  },
});

export const loginScreenActions = loginScreenSlice.actions;
export default loginScreenSlice.reducer;
