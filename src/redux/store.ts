import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

const makeStore = () =>
  configureStore({
    reducer: {
      //
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

export default makeStore;
