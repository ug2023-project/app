import { UniqueIdentifier } from '@dnd-kit/core';

type Collection = {
  id: number | string;
  createdAt: string;
  updatedAt: string;
  title: string;
  cover: string | null;
  color: string | null;
  deleted: boolean;
  view: 'LIST' | 'SIMPLE' | 'GRID';
  public: boolean;
  collapsed: boolean;
  authorId: number;
  parentId: number | string | null;
  bookmarks: UniqueIdentifier[];
};

export default Collection;
