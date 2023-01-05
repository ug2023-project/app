import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCollectionSearch } from './collection.actions';
import collectionInitialState from './collection.state';
import Collection from '@/types/Collection';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: collectionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCollectionSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCollectionSearch.fulfilled,
      (state, action: PayloadAction<Collection[]>) => {
        state.collections = action.payload;
        state.loading = false;
        state.error = '';
      },
    );
    builder.addCase(fetchCollectionSearch.rejected, (state, action) => {
      state.collections = [];
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default collectionSlice;
