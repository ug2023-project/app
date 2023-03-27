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
  expanded: boolean;
  authorId: number;
  parentId: number | string | null;
  bookmarkOrder: (number | string)[];
};

export default Collection;
