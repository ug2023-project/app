import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCollectionBookmarksSearch,
  updateSelectedBookmarks,
} from './bookmarks.actions';
import bookmarkInitialState from './bookmarks.state';

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: bookmarkInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch collection bookmarks search
    builder.addCase(fetchCollectionBookmarksSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCollectionBookmarksSearch.fulfilled,
      (state, action) => {
        action.payload.forEach((bookmark) => {
          state.bookmarks[bookmark.id] = bookmark;
        });
        state.currentSearch = action.payload;
        state.loading = false;
        state.error = null;
      },
    );
    builder.addCase(
      fetchCollectionBookmarksSearch.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        state.currentSearch = [];
      },
    );
    // Update dragging bookmarks
    builder.addCase(updateSelectedBookmarks, (state, action) => {
      state.draggingIds = action.payload;
    });
  },
});

export default bookmarkSlice;
