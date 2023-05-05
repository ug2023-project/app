import type { MutableRefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';

export type TreeItem = {
  id: UniqueIdentifier;
  title: string;
  children: TreeItem[];
  collapsed?: boolean;
};

export type TreeItems = TreeItem[];

export type FlattenedItem = TreeItem & {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
};

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
