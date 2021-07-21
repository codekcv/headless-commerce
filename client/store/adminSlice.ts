/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setMemoryToken } from 'utils/refreshTokenCookie';

export type AdminState = {
  checkingAccess: boolean;
  accessToken: string | null;
  isAuthorized: boolean | null;
};

const initialState: AdminState = {
  checkingAccess: true,
  accessToken: null,
  isAuthorized: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCheckingAccess: (state, { payload }: PayloadAction<boolean>) => {
      state.checkingAccess = payload;
    },
    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
      setMemoryToken(payload);
    },
    setIsAuthorized: (state, { payload }: PayloadAction<boolean | null>) => {
      state.isAuthorized = payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
