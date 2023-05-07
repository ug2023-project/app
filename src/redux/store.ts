import authSlice from './auth/auth.slice';
import { combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { api } from '../services/bookmarks';
import bookmarkSlice from '@/containers/Dashboard/ducks/bookmarks/bookmarkSlice';
import collectionsSlice from '@/containers/Dashboard/ducks/collections/collectionSlice';

const rootReducer = combineReducers({
  [collectionsSlice.name]: collectionsSlice.reducer,
  [bookmarkSlice.name]: bookmarkSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  serialize: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export default store;
