import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import type { FlattenedItem, TreeItem, TreeItems } from './types';

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

const getDragDepth = (offset: number, indentationWidth: number) =>
  Math.round(offset / indentationWidth);

export const getProjection = (
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number,
) => {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  if (overItemIndex === -1) return null;
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  if (activeItemIndex === -1) return null;
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
};

const getMaxDepth = ({ previousItem }: { previousItem: FlattenedItem }) => {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
};

const getMinDepth = ({ nextItem }: { nextItem: FlattenedItem }) => {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
};

const flatten = (
  items: TreeItems,
  parentId: UniqueIdentifier | null = null,
  depth = 0,
): FlattenedItem[] =>
  items.reduce<FlattenedItem[]>(
    (acc, item, index) => [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(item.children, item.id, depth + 1),
    ],
    [],
  );

export const flattenTree = (items: TreeItems) => flatten(items);

const findItemDeep = (
  items: TreeItems,
  itemId: UniqueIdentifier,
): TreeItem | undefined => {
  for (const item of items) {
    const { id, children } = item;

    if (id === itemId) {
      return item;
    }

    if (children.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
};

export const removeItem = (items: TreeItems, id: UniqueIdentifier) => {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.children.length) {
      item.children = removeItem(item.children, id);
    }

    newItems.push(item);
  }

  return newItems;
};

const countChildren = (items: TreeItem[], count = 0): number =>
  items.reduce((acc, { children }) => {
    if (children.length) {
      return countChildren(children, acc + 1);
    }

    return acc + 1;
  }, count);

export const getChildCount = (items: TreeItems, id: UniqueIdentifier) => {
  const item = findItemDeep(items, id);

  return item ? countChildren(item.children) : 0;
};

export const removeChildrenOf = (
  items: FlattenedItem[],
  ids: UniqueIdentifier[],
) => {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
};
