import { createBookmark } from './../bookmarks/bookmarks.actions';
import { createSlice } from '@reduxjs/toolkit';
import {
  collapseAllCollections,
  toggleCollectionCollapsed,
  createCollection,
  editCollection,
  fetchAllCollections,
  moveCollection,
} from './collections.actions';
import collectionInitialState from './collections.state';
import { normalizeCollectionsApi } from '@/utils/collectionMapper';
import { copy } from 'copy-anything';
import { moveBookmarksToCollection } from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';
import { arrayMove } from '@dnd-kit/sortable';
import { notifications } from '@mantine/notifications';

const TEMPORARY_COLLECTION_ID = -1000;

function insertValuesOnIndex<T>(
  array: T[],
  values: T[],
  index: number,
  removeDuplicates = false,
): T[] {
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
      const { collections, collectionOrder } = action.payload;
      const normalizedCollections = normalizeCollectionsApi(collections);

      state.ids = collectionOrder;
      state.collections = normalizedCollections;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchAllCollections.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
      apiErrorNotification();
    });
    // Create collection
    builder.addCase(createCollection.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);

      const { title, parentId } = action.meta.arg.body;

      const collections = state.ids.map((id) => state.collections[id]);
      const firstChildCollectionIndex = collections.findIndex(
        (collection) => collection?.parentId === parentId,
      );

      state.collections[TEMPORARY_COLLECTION_ID] = {
        id: TEMPORARY_COLLECTION_ID,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title,
        cover: null,
        color: null,
        deleted: false,
        view: 'LIST',
        public: false,
        collapsed: false,
        authorId: 1,
        parentId,
        bookmarkOrder: [],
      };

      if (firstChildCollectionIndex === -1) {
        state.ids = [TEMPORARY_COLLECTION_ID, ...state.ids];
        return;
      }
      state.ids = [
        ...state.ids.slice(0, firstChildCollectionIndex),
        TEMPORARY_COLLECTION_ID,
        ...state.ids.slice(firstChildCollectionIndex),
      ];
    });
    builder.addCase(createCollection.fulfilled, (state, action) => {
      const newCollection = action.payload;
      const collection = state.collections[TEMPORARY_COLLECTION_ID];

      state.ids = state.ids.map((id) => {
        if (id === TEMPORARY_COLLECTION_ID) {
          return newCollection.id;
        }
        return id;
      });
      state.collections[newCollection.id] = {
        ...collection,
        ...newCollection,
      };
      delete state.collections[TEMPORARY_COLLECTION_ID];

      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(createCollection.rejected, (state) => {
      if (state.previousIds && state.previousCollections) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      state.previousIds = null;
      state.previousCollections = null;
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
    // Toggle collection collapsed
    builder.addCase(toggleCollectionCollapsed.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);
      const collectionId = action.meta.arg;
      const collection = state.collections[collectionId];
      if (!collection) return;
      collection.collapsed = !collection.collapsed;
    });
    builder.addCase(toggleCollectionCollapsed.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(toggleCollectionCollapsed.rejected, (state) => {
      if (state.previousCollections && state.previousIds) {
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
    // Move bookmarks to collection
    builder.addCase(moveBookmarksToCollection.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);
      const { collectionId } = action.meta.arg.params;
      const {
        collectionId: newCollectionId,
        index,
        bookmarkIds,
      } = action.meta.arg.body;

      const collection = state.collections[collectionId];
      if (collection && newCollectionId === collectionId) {
        collection.bookmarkOrder = insertValuesOnIndex(
          collection.bookmarkOrder,
          bookmarkIds,
          index,
          true,
        );
      } else if (collection) {
        const newCollection = state.collections[newCollectionId];

        if (collection.bookmarkOrder) {
          collection.bookmarkOrder = collection.bookmarkOrder.filter(
            (id) => !bookmarkIds.includes(id),
          );
        }

        if (newCollection?.bookmarkOrder) {
          newCollection.bookmarkOrder = insertValuesOnIndex(
            newCollection.bookmarkOrder,
            bookmarkIds,
            index,
          );
        }
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
      const collection = state.collections[bookmark.collectionId];
      if (!collection) return;
      const order = collection.bookmarkOrder;
      collection.bookmarkOrder = [bookmark.id, ...order];
    });
  },
});
export default collectionsSlice;
