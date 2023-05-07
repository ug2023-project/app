import { createSlice } from '@reduxjs/toolkit';
import collectionInitialState from './collectionInitialState';
import { copy } from 'copy-anything';
import { arrayMove } from '@dnd-kit/sortable';
import { notifications } from '@mantine/notifications';
import fetchAllCollections from './actions/fetchAllCollections';
import moveCollection from './actions/moveCollection';
import collapseAllCollections from './actions/collapseAllCollection';
import editCollection from './actions/editCollection';
import changeBookmarksOrder from '../bookmarks/actions/changeBookmarkOrder';
import moveBookmarksToCollection from '../bookmarks/actions/moveBookmarksToCollection';
import createBookmark from '../bookmarks/actions/createBookmark';
import removeBookmark from '../bookmarks/actions/removeBookmark';
import normalizeCollections from '@/utils/collectionMapper';

const TEMPORARY_COLLECTION_ID = -1000;

function insertValues<T>({
  array,
  values,
  index = 0,
  removeDuplicates = false,
}: {
  array: T[];
  values: T[];
  index?: number;
  removeDuplicates?: boolean;
}): T[] {
  if (removeDuplicates) {
    const result = [
      ...array.filter((item) => !values.includes(item)),
      ...new Array(values.length).fill(null),
    ];
    return [
      ...result.slice(0, index),
      ...values,
      ...result.slice(index),
    ].filter((item) => item !== null);
  }
  return [...array.slice(0, index), ...values, ...array.slice(index)];
}

function apiErrorNotification() {
  notifications.show({
    title: 'API error',
    message: 'Something went wrong',
    color: 'red',
  });
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: collectionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all collections
    builder.addCase(fetchAllCollections.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCollections.fulfilled, (state, action) => {
      const { collections, collectionsOrder } = action.payload;
      const normalizedCollections = normalizeCollections(collections);

      state.ids = collectionsOrder;
      state.collections = normalizedCollections;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchAllCollections.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
      apiErrorNotification();
    });
    // Edit collection
    builder.addCase(editCollection.pending, (state, action) => {
      state.previousCollections = copy(state.collections);

      const id = action.meta.arg.collectionId;
      const { title } = action.meta.arg.body;

      const collection = state.collections[id];
      if (!collection) return;

      collection.title = title;
    });
    builder.addCase(editCollection.fulfilled, (state) => {
      state.previousCollections = null;
    });
    builder.addCase(editCollection.rejected, (state) => {
      if (state.previousCollections) {
        state.collections = state.previousCollections;
      }
      state.previousCollections = null;
      apiErrorNotification();
    });
    // Move collections
    builder.addCase(moveCollection.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);

      const { parentId, index, collectionId } = action.meta.arg.body;
      const collection = state.collections[collectionId];
      if (!collection) return;
      collection.parentId = parentId === 0 ? null : parentId;

      const activeIndex = state.ids.findIndex((id) => id === collectionId);
      state.ids = arrayMove(state.ids, activeIndex, index);
    });
    builder.addCase(moveCollection.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(moveCollection.rejected, (state) => {
      if (state.previousIds && state.previousCollections) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      state.previousIds = null;
      state.previousCollections = null;
      apiErrorNotification();
    });
    // Collapse all collections
    builder.addCase(collapseAllCollections.pending, (state) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);
      state.ids.forEach((collectionId) => {
        const collection = state.collections[collectionId];
        if (!collection) return;
        collection.collapsed = true;
      });
    });
    builder.addCase(collapseAllCollections.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(collapseAllCollections.rejected, (state) => {
      if (state.previousCollections && state.previousIds) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      state.previousIds = null;
      state.previousCollections = null;
      apiErrorNotification();
    });
    // Change bookmark order
    builder.addCase(changeBookmarksOrder.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);

      const { collectionId } = action.meta.arg.params;
      const { index, bookmarkIds } = action.meta.arg.body;

      const collection = state.collections[collectionId];
      if (!collection) return;
      collection.bookmarks = insertValues({
        array: collection.bookmarks,
        values: bookmarkIds,
        index,
        removeDuplicates: true,
      });
    });
    builder.addCase(changeBookmarksOrder.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(changeBookmarksOrder.rejected, (state) => {
      if (state.previousIds && state.previousCollections) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      apiErrorNotification();
    });
    // Move bookmarks to collection
    builder.addCase(moveBookmarksToCollection.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);

      const { collectionId } = action.meta.arg.params;
      const { collectionId: newCollectionId, bookmarkIds } =
        action.meta.arg.body;
      if (collectionId === newCollectionId) return;
      if (collectionId === -1 && newCollectionId === 0) return;

      const collection = state.collections[collectionId];
      if (!collection) return;

      const newCollection =
        state.collections[newCollectionId === 0 ? -1 : newCollectionId];
      if (collection) {
        collection.bookmarks = collection.bookmarks.filter(
          (id) => !bookmarkIds.includes(id),
        );
      }
      if (newCollectionId !== 0 && newCollection?.bookmarks) {
        newCollection.bookmarks = insertValues({
          array: newCollection.bookmarks,
          values: bookmarkIds,
        });
      }
    });
    builder.addCase(moveBookmarksToCollection.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(moveBookmarksToCollection.rejected, (state) => {
      if (state.previousIds && state.previousCollections) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      apiErrorNotification();
    });
    // Add bookmark
    builder.addCase(createBookmark.fulfilled, (state, action) => {
      const bookmark = action.payload;
      if (!bookmark.collectionId) return;
      const collection = state.collections[bookmark.collectionId];
      if (!collection) return;
      const order = collection.bookmarks;
      collection.bookmarks = [bookmark.id, ...order];
    });
    // Remove bookmark
    builder.addCase(removeBookmark.pending, (state, action) => {
      state.previousCollections = copy(state.collections);
      const { collectionId, bookmarkId } = action.meta.arg;
      const collection = state.collections[collectionId];
      if (!collection) return;
      const trashCollection = state.collections[-99];
      if (!trashCollection) return;
      collection.bookmarks = collection.bookmarks.filter(
        (id) => id !== bookmarkId,
      );
      if (collectionId !== -99) {
        trashCollection.bookmarks = [bookmarkId, ...trashCollection.bookmarks];
      }
    });
    builder.addCase(removeBookmark.fulfilled, (state) => {
      state.previousCollections = null;
    });
    builder.addCase(removeBookmark.rejected, (state) => {
      if (state.previousCollections) {
        state.collections = state.previousCollections;
      }
      apiErrorNotification();
    });
  },
});
export default collectionsSlice;
