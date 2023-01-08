import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCollections, moveCollections } from './collection.actions';
import collectionInitialState from './collection.state';
import collectionApiMapper from '@/utils/collectionMapper';

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
    builder.addCase(moveCollections.pending, (state) => {
      state.previousCollections = state.collections;
    });
    builder.addCase(moveCollections.fulfilled, (state) => {
      state.previousCollections = null;
    });
    builder.addCase(moveCollections.rejected, (state) => {
      if (state.previousCollections) {
        state.collections = [...state.previousCollections];
        state.previousCollections = null;
      }
    });
  },
});

export default collectionSlice;
