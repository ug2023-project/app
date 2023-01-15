import bookmarkSlice from '@/containers/Dashboard/ducks/bookmarks/bookmarks.slice';
import collectionsSlice from '@/containers/Dashboard/ducks/collections/collections.slice';
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

const rootReducer = combineReducers({
  [collectionsSlice.name]: collectionsSlice.reducer,
  [bookmarkSlice.name]: bookmarkSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
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
