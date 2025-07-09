import { createSlice } from '@reduxjs/toolkit';

type Mode = 'light' | 'dark';

const slice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' as Mode },
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;