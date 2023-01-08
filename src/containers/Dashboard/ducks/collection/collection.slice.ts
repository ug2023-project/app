import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllCollections, moveCollections } from './collection.actions';
import collectionInitialState from './collection.state';
import collectionApiMapper from '@/utils/collectionMapper';
import Collection from '@/types/Collection';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: collectionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all collections
    builder.addCase(fetchAllCollections.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCollections.fulfilled, (state, action) => {
      state.collections = collectionApiMapper(action.payload);
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchAllCollections.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    // Move collections
    builder.addCase(moveCollections.pending, (state, action) => {
      const fromCollectionId = action.meta.arg.params.collectionId;
      const toCollectionId = action.meta.arg.body.collectionId;

      const previousCollectionsUpdatedState: Record<
        number | string,
        Collection
      > = {};

      if (toCollectionId !== 0) {
        const toCollection = state.collections.find(
          (collection) => collection.id === toCollectionId,
        );

        if (!toCollection) {
          throw new Error(
            `Collection not found: ${toCollectionId}, should not happen`,
          );
        }

        previousCollectionsUpdatedState[toCollection.id] = toCollection;
      }

      if (fromCollectionId !== 0) {
        const fromCollection = state.collections.find(
          (collection) => collection.id === fromCollectionId,
        );
        if (!fromCollection) {
          throw new Error(`Collection not found: ${fromCollectionId}`);
        }
        previousCollectionsUpdatedState[fromCollection.id] = fromCollection;
      }

      state.previousCollectionsUpdatedState = previousCollectionsUpdatedState;
      state.collections = action.meta.arg.newTree;
    });
    builder.addCase(moveCollections.fulfilled, (state) => {
      state.previousCollectionsUpdatedState = null;
    });
    builder.addCase(moveCollections.rejected, (state) => {
      console.log('moveCollections.rejected');
      state.collections = [];
      // state.collections = state.collections.map((collection) => {
      //   const previousCollection =
      //     state.previousCollectionsUpdatedState?.[collection.id];

      //   if (previousCollection) {
      //     return previousCollection;
      //   }
      //   return collection;
      // });
      state.previousCollectionsUpdatedState = null;
    });
  },
});

export default collectionSlice;
