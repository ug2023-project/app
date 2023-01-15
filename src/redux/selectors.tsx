import { AppState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { CollectionId } from '@/types/TreeCollection';

const selectSelf = (state: AppState) => state;
const selectCollectionIds = createSelector(
  selectSelf,
  (state) => state.collections.ids,
);
const selectNormalizedCollections = createSelector(
  selectSelf,
  (state) => state.collections.collections,
);
export const selectCollections = createSelector(
  selectCollectionIds,
  selectNormalizedCollections,
  (ids, collections) => ids.map((id) => collections[id]),
);

export const selectHasChildrenCollections = (collectionId: CollectionId) =>
  createSelector(selectCollections, (collections) =>
    collections.some((collection) => collection.parent === collectionId),
  );

const selectNormalizedBookmarks = createSelector(
  selectSelf,
  (state) => state.bookmarks.bookmarks,
);

export const selectCollectionBookmarks = (collectionId: CollectionId) =>
  createSelector(
    selectNormalizedCollections,
    selectNormalizedBookmarks,
    (collections, bookmarks) => {
      const collection = collections[collectionId];
      return collection.data!.bookmarkOrder.map((id) => bookmarks[id]);
    },
  );

export const selectCurrentSearchBookmarks = createSelector(
  selectSelf,
  (state) => state.bookmarks.currentSearch,
);
export const selectDraggingBookmarkIds = createSelector(
  selectSelf,
  (state) => state.bookmarks.draggingIds,
);