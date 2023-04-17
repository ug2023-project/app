import { createSlice } from '@reduxjs/toolkit';
import {
  createBookmark,
  fetchCollectionBookmarksSearch,
  moveBookmarksToCollection,
  removeBookmark,
} from './bookmarks.actions';
import bookmarkInitialState from './bookmarks.state';
import { copy } from 'copy-anything';

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

    // Move bookmarks to collection
    builder.addCase(moveBookmarksToCollection.pending, (state, action) => {
      state.previousBookmarks = copy(state.bookmarks);

      const { collectionId: newCollectionId, bookmarkIds } =
        action.meta.arg.body;

      const bookmarks = bookmarkIds.map((id) => state.bookmarks[id]);
      bookmarks.forEach((bookmark) => {
        if (bookmark) {
          bookmark.collectionId = newCollectionId === 0 ? -1 : newCollectionId;
        }
      });
    });
    builder.addCase(moveBookmarksToCollection.fulfilled, (state) => {
      state.previousBookmarks = null;
    });
    builder.addCase(moveBookmarksToCollection.rejected, (state) => {
      if (state.previousBookmarks) {
        state.bookmarks = state.previousBookmarks;
      }
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
    // Remove bookmark
    builder.addCase(removeBookmark.pending, (state) => {
      state.loading = true;
      state.previousBookmarks = copy(state.bookmarks);
    });
    builder.addCase(removeBookmark.fulfilled, (state, action) => {
      const { collectionId, bookmarkId } = action.meta.arg;
      if (collectionId === -99) {
        delete state.bookmarks[bookmarkId];
      } else {
        const bookmark = state.bookmarks[bookmarkId];
        if (bookmark) {
          bookmark.collectionId = -99;
        }
      }
      state.loading = false;
      state.error = null;
      state.previousBookmarks = null;
    });
    builder.addCase(removeBookmark.rejected, (state) => {
      if (state.previousBookmarks) {
        state.bookmarks = state.previousBookmarks;
      }
    });
  },
});

export default bookmarkSlice;
