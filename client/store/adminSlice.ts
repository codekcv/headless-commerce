/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMemoryToken } from 'utils/refreshTokenCookie';

const local = process.env.NODE_ENV === 'development';

export type AdminState = {
  isFirstTime: boolean;
  isConnected: boolean;
  accessToken: string | null;
  checkingAccess: boolean;
  isAuthorized: boolean | null;
};

const initialState: AdminState = {
  isFirstTime: true,
  isConnected: false,
  accessToken: null,
  checkingAccess: true,
  isAuthorized: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    firstLoginDone: (state, { payload }: PayloadAction<boolean>) => {
      // This is to keep the URL route the same when the admin refreshes.
      // Later on when sessions are implemented.
      state.isFirstTime = !payload;
    },
    setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
    },
    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
      setMemoryToken(payload);
    },
    setCheckingAccess: (state, { payload }: PayloadAction<boolean>) => {
      state.checkingAccess = payload;
    },
    setIsAuthorized: (state, { payload }: PayloadAction<boolean | null>) => {
      state.isAuthorized = payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
