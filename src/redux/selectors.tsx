import { AppState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import Bookmark from '@/types/Bookmark';
import { TreeItems } from '@/components/Tree/types';
import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';
import { flattenTree, removeChildrenOf } from '@/components/Tree/utilities';

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
  (ids, collections): TreeItems => {
    const collectionList = ids.map((id) => collections[id]) as Collection[];
    return buildTree(collectionList);
  },
);

export const selectCollectionById = (id: UniqueIdentifier) =>
  createSelector(selectNormalizedCollections, (collections) => collections[id]);

function buildTree(collections: Collection[]): TreeItems {
  const treeItemsWithChildren = collections.map((c) => ({
    id: c.id,
    title: c.title,
    children: getChildren(collections, c.id),
    collapsed: c.collapsed,
    parentId: c.parentId,
  }));
  return treeItemsWithChildren.filter((c) => c.parentId === null);
}

function getChildren(
  collections: Collection[],
  parentId: UniqueIdentifier,
): TreeItems {
  return collections
    .filter((c) => c.parentId === parentId)
    .map((c) => ({
      id: c.id,
      title: c.title,
      children: getChildren(collections, c.id),
      collapsed: c.collapsed,
    }));
}

const selectNormalizedBookmarks = createSelector(
  selectSelf,
  (state) => state.bookmarks.bookmarks,
);

export const selectCollectionBookmarks = (collectionId: number) =>
  createSelector(
    selectNormalizedCollections,
    selectNormalizedBookmarks,
    (collections, bookmarks) => {
      const collection = collections[collectionId];
      if (!collection) return [];
      return (collection.bookmarkOrder
        .map((id) => bookmarks[id])
        .filter(Boolean) ?? []) as Bookmark[];
    },
  );

export const selectCurrentSearchBookmarks = createSelector(
  selectSelf,
  (state) => state.bookmarks.currentSearch,
);

export const selectDraggingBookmarkIds = createSelector(
  selectSelf,
  (state) => state.bookmarks.dndOptions.draggingIds,
);

export const selectActiveBookmarkId = createSelector(
  selectSelf,
  (state) => state.bookmarks.dndOptions.activeId,
);

export const selectActiveId = createSelector(
  selectSelf,
  (state) => state.collections.dndOptions.activeId,
);

export const selectOffsetLeft = createSelector(
  selectSelf,
  (state) => state.collections.dndOptions.offsetLeft,
);

export const selectFlattenedItems = createSelector(
  selectCollections,
  selectActiveId,
  (items, activeId) => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      [],
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems,
    );
  },
);
