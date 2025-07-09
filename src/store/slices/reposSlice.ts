import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import github from '@/src/services/github';

interface FetchArgs { page: number; query: string; refresh?: boolean }

export const fetchRepos = createAsyncThunk(
  'repos/fetch',
  async ({ page, query }: FetchArgs) => github.list(page, query)
);

const slice = createSlice({
  name: 'repos',
  initialState: {
    list: [] as any[],
    page: 1,
    query: '',
    current: null as any | null,
    loading: false,
    refreshing: false,
    hasMore: true,
    error: null as string | null,
  },
  reducers: {
    setCurrent: (state, action) => { state.current = action.payload; },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.list = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRepos.pending, (state, action) => {
        state.loading = !action.meta.arg.refresh;
        state.refreshing = !!action.meta.arg.refresh;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        const data = action.payload;
        state.list = action.meta.arg.page === 1 ? data : [...state.list, ...data];
        state.hasMore = data.length > 0;
        state.page = action.meta.arg.page;
        state.error = null;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = state.refreshing = false;
        state.error = action.error.message ?? 'Error';
      });
  },
});

export const { setCurrent, setQuery } = slice.actions;
export default slice.reducer;