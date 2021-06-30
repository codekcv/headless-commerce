import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const local = process.env.NODE_ENV === 'development';

export type AdminState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isConnected: boolean;
};

const initialState: AdminState = {
  isLoggedIn: false,
  isFirstTime: true,
  isConnected: false,
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
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
