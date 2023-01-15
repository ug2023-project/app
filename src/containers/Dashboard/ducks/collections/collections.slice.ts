import { createSlice } from '@reduxjs/toolkit';
import {
  createCollection,
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
        (collection) => collection.parent === parentId,
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
        collection.parent,
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
        collection.parent = newParentId;
      });

      const collections = state.ids.map((id) => state.collections[id]);
      const firstChildCollectionIndex = collections.findIndex(
        (collection) => collection.parent === newParentId,
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
        collection.data!.expanded = setOfExpandedCollectionsIds.has(id);
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
  },
});

export default collectionsSlice;
