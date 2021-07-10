/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMemoryToken } from 'utils/refreshTokenCookie';

const local = process.env.NODE_ENV === 'development';

export type AdminState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isConnected: boolean;
  isAuthorized: boolean;
  accessToken: string | null;
  checkingAccess: boolean;
};

const initialState: AdminState = {
  isLoggedIn: false,
  isFirstTime: true,
  isConnected: false,
  isAuthorized: false,
  accessToken: null,
  checkingAccess: true,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setIsLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
    firstLoginDone: (state, { payload }: PayloadAction<boolean>) => {
      // This is to keep the URL route the same when the admin refreshes.
      // Later on when sessions are implemented.
      state.isFirstTime = !payload;
    },
    setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnected = payload;
    },
    setIsAuthorized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthorized = payload;
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
      setMemoryToken(payload);
    },
    setCheckingAccess: (state, { payload }: PayloadAction<boolean>) => {
      state.checkingAccess = payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
