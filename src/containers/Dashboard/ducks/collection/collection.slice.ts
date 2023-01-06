import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCollections } from './collection.actions';
import collectionInitialState from './collection.state';
import collectionApiMapper from '@/utils/collectionMapper';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: collectionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCollections.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllCollections.fulfilled,
      (state, action) => {
        console.log(collectionApiMapper(action.payload));
        state.collections = action.payload;
        state.loading = false;
        state.error = '';
      },
    );
    builder.addCase(fetchAllCollections.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default collectionSlice;
