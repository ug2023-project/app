import { createSlice } from '@reduxjs/toolkit';
import { fetchCollectionBookmarksSearch } from './bookmark.actions';
import bookmarkInitialState from './bookmark.state';

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: bookmarkInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCollectionBookmarksSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCollectionBookmarksSearch.fulfilled,
      (state, action) => {
        state.bookmarks = action.payload;
        state.loading = false;
        state.error = '';
      },
    );
    builder.addCase(fetchCollectionBookmarksSearch.rejected, (state, action) => {
      state.bookmarks = [];
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default bookmarkSlice;
