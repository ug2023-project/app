import { AppState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { TreeItems } from '@/components/Tree/types';
import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';

const selectSelf = (state: AppState) => state;

const selectCollectionIds = createSelector(
  selectSelf,
  (state) => state.collections.ids,
);
const selectNormalizedCollections = createSelector(
  selectSelf,
  (state) => state.collections.collections,
);

export const selectDefaultCollections = createSelector(
  selectNormalizedCollections,
  (collections): TreeItems => {
    const collectionList = [0, -1, -99]
      .map((id) => collections[id])
      .filter(Boolean);
    return buildTree(collectionList);
  },
);

export const selectCustomCollections = createSelector(
  selectCollectionIds,
  selectNormalizedCollections,
  (ids, collections): TreeItems => {
    const collectionList = ids.map((id) => collections[id]).filter(Boolean);
    return buildTree(collectionList);
  },
);

export const selectCollectionById = (id: UniqueIdentifier) =>
  createSelector(selectNormalizedCollections, (collections) => collections[id]);



const selectNormalizedBookmarks = createSelector(
  selectSelf,
  (state) => state.bookmarks.bookmarks,
);

export const selectCollectionBookmarks = (collectionId: UniqueIdentifier) =>
  createSelector(
    selectSelf,
    selectNormalizedCollections,
    selectNormalizedBookmarks,
    (state, collections, bookmarks) => {
      if (collectionId === 0) {
        return state.bookmarks.currentSearch;
      }

      const collection = collections[collectionId];
      if (!collection) {
        return [];
      }

      const collectionBookmarks =
        collection.bookmarks.map((id) => bookmarks[id]).filter(Boolean) ?? [];

      return collectionBookmarks;
    },
  );

export const selectCurrentSearchBookmarks = createSelector(
  selectSelf,
  (state) => state.bookmarks.currentSearch,
);
