/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'dashboard',
  initialState: {
    isSiderMoving: false,
  },
  reducers: {
    setIsSiderMoving: (state, { payload }: PayloadAction<boolean>) => {
      state.isSiderMoving = payload;
    },
  },
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
