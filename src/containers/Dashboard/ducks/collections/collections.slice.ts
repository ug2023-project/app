import { createBookmark } from './../bookmarks/bookmarks.actions';
import { createSlice } from '@reduxjs/toolkit';
import {
  createCollection,
  editCollection,
  expandCollections,
  fetchAllCollections,
  moveCollections,
} from './collections.actions';
import collectionInitialState from './collections.state';
import {
  normalizeCollectionsApi,
  toCollection,
} from '@/utils/collectionMapper';
import { copy } from 'copy-anything';
import CollectionApi from '@/types/CollectionApi';
import { moveBookmarksToCollection } from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';

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
    });
    // Create collection
    builder.addCase(createCollection.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);

      const { title, parentId } = action.meta.arg.body;
      const { temporaryId } = action.meta.arg;

      const collections = state.ids.map((id) => state.collections[id]);
      const firstChildCollectionIndex = collections.findIndex(
        (collection) => collection?.parent === parentId,
      );

      const temporaryCollectionApi: CollectionApi = {
        id: temporaryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title,
        cover: null,
        color: null,
        deleted: false,
        view: 'LIST',
        public: false,
        expanded: false,
        authorId: 1,
        parentId,
        bookmarkOrder: [],
      };
      state.collections[temporaryId] = toCollection(
        temporaryCollectionApi,
        parentId,
      );

      state.ids = [
        ...state.ids.slice(0, firstChildCollectionIndex),
        temporaryId,
        ...state.ids.slice(firstChildCollectionIndex),
      ];
    });
    builder.addCase(createCollection.fulfilled, (state, action) => {
      const newCollection = action.payload;
      const collection = state.collections[action.meta.arg.temporaryId];

      state.ids = state.ids.map((collectionId) => {
        if (collectionId === action.meta.arg.temporaryId) {
          return newCollection.id;
        }
        return collectionId;
      });
      state.collections[newCollection.id] = toCollection(
        newCollection,
        collection?.parent ?? 0,
      );
      delete state.collections[action.meta.arg.temporaryId];

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
    });
    // Edit collection
    builder.addCase(editCollection.pending, (state, action) => {
      state.previousCollections = copy(state.collections);

      const id = action.meta.arg.collectionId;
      const { title } = action.meta.arg.body;

      const collection = {
        ...state.collections[id],
        text: title,
      };

      state.collections[id] = collection;
    });
    builder.addCase(editCollection.fulfilled, (state) => {
      state.previousCollections = null;
    });
    builder.addCase(editCollection.rejected, (state) => {
      if (state.previousCollections) {
        state.collections = state.previousCollections;
      }
      state.previousCollections = null;
    });
    // Move collections
    builder.addCase(moveCollections.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);
      const {
        parentId: newParentId,
        index,
        collectionIds,
      } = action.meta.arg.body;

      collectionIds.forEach((collectionId) => {
        const collection = state.collections[collectionId];
        if (collection) {
          collection.parent = newParentId;
        }
      });

      const collections = state.ids.map((id) => state.collections[id]);
      const firstChildCollectionIndex = collections.findIndex(
        (collection) => collection?.parent === newParentId,
      );

      state.ids = [
        ...state.ids
          .slice(0, firstChildCollectionIndex + index)
          .filter((id) => !collectionIds.includes(id)),
        ...collectionIds,
        ...state.ids
          .slice(firstChildCollectionIndex + index)
          .filter((id) => !collectionIds.includes(id)),
      ];
    });
    builder.addCase(moveCollections.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(moveCollections.rejected, (state) => {
      if (state.previousIds && state.previousCollections) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      state.previousIds = null;
      state.previousCollections = null;
    });
    // Expand collections
    builder.addCase(expandCollections.pending, (state, action) => {
      state.previousIds = copy(state.ids);
      state.previousCollections = copy(state.collections);

      const expandedCollectionsIds = action.meta.arg;
      const setOfExpandedCollectionsIds = new Set(expandedCollectionsIds);
      const setOfAllCollectionsIds = new Set(state.ids);
      setOfAllCollectionsIds.forEach((id) => {
        const collection = state.collections[id];
        if (collection?.data) {
          collection.data.expanded = setOfExpandedCollectionsIds.has(id);
        }
      });
    });
    builder.addCase(expandCollections.fulfilled, (state) => {
      state.previousIds = null;
      state.previousCollections = null;
    });
    builder.addCase(expandCollections.rejected, (state) => {
      if (state.previousCollections && state.previousIds) {
        state.ids = state.previousIds;
        state.collections = state.previousCollections;
      }
      state.previousIds = null;
      state.previousCollections = null;
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
      if (newCollectionId === collectionId && collection?.data) {
        collection.data.bookmarkOrder = insertValuesOnIndex(
          collection.data.bookmarkOrder,
          bookmarkIds,
          index,
          true,
        );
      } else if (collection) {
        const newCollection = state.collections[newCollectionId];

        if (collection.data?.bookmarkOrder) {
          collection.data.bookmarkOrder = collection.data?.bookmarkOrder.filter(
            (id) => !bookmarkIds.includes(id),
          );
        }

        if (newCollection?.data?.bookmarkOrder) {
          newCollection.data.bookmarkOrder = insertValuesOnIndex(
            newCollection.data.bookmarkOrder,
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
    });
    // Add bookmark
    builder.addCase(createBookmark.fulfilled, (state, action) => {
      const bookmark = action.payload;
      const collection = state.collections[bookmark.collectionId];
      if (collection.data) {
        const order = collection.data.bookmarkOrder;
        const newOrder = [bookmark.id, ...order];
        collection.data.bookmarkOrder = newOrder;
      }
    });
  },
});

export default collectionsSlice;
