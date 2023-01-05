import bookmarkSlice from '@/containers/Dashboard/ducks/bookmark/bookmark.slice';
import collectionSlice from '@/containers/Dashboard/ducks/collection/collection.slice';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

const makeStore = () =>
  configureStore({
    reducer: {
      [collectionSlice.name]: collectionSlice.reducer,
      [bookmarkSlice.name]: bookmarkSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

const store = makeStore();

export default store;
