import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const local = process.env.NODE_ENV === 'development';

const initialState = {
  isLoggedIn: false,
  isFirstTime: true,
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
      state.isFirstTime = payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
