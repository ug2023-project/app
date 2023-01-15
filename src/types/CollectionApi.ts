import { CollectionId } from './TreeCollection';

type CollectionApi = {
  id: CollectionId;
  createdAt: string;
  updatedAt: string;
  title: string;
  cover: string | null;
  color: string | null;
  deleted: boolean;
  view: 'LIST' | 'SIMPLE' | 'GRID';
  public: boolean;
  expanded: boolean;
  authorId: number;
  parentId: CollectionId | null;
  bookmarkOrder: CollectionId[];
};

export default CollectionApi;
