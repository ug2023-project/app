import { createSlice } from '@reduxjs/toolkit';
import {
  createBookmark,
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
    // Add bookmark
    builder.addCase(createBookmark.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBookmark.fulfilled, (state, action) => {
      state.bookmarks[action.payload.id] = action.payload;
    });
    builder.addCase(createBookmark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default bookmarkSlice;
