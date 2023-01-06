type CollectionApi = {
    id: number;
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
    parentId: number | null;
    childrenOrder: number[];
    bookmarkOrder: number[];
  }

export default CollectionApi;