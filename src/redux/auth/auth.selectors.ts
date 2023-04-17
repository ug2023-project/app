import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectSelf = (state: AppState) => state;

export const selectAuth = createSelector(selectSelf, (state) => state.auth);

export const isFetchingUser = createSelector(
  selectAuth,
  (state) => state.loading,
);

export const isUserLoggedIn = createSelector(
  selectAuth,
  (state) => state.user !== null,
);
