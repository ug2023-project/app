import { UniqueIdentifier } from '@dnd-kit/core';

type Collection = {
  id: UniqueIdentifier;
  createdAt: string;
  title: string;
  authorId: string;
  cover: string | null;
  color: string | null;
  count: number;
  collapsed: boolean;
  parentId: UniqueIdentifier | null;
};

export default Collection;
