import TreeData from '@/components/Tree/TreeData';
import Bookmark from '@/types/Bookmark';
import TreeCollection, { CollectionId } from '@/types/TreeCollection';

export type CollectionState = {
  ids: CollectionId[];
  collections: Record<CollectionId, TreeCollection>;
  previousIds: CollectionId[] | null;
  previousCollections: Record<CollectionId, TreeCollection> | null;
  loading: boolean;
  error: string | null;
};

export type BookmarkState = {
  bookmarks: Record<number | string, Bookmark>;
  currentSearch: Bookmark[];
  draggingIds: number[];
  loading: boolean;
  error: string | null;
};

export type FetchCollectionBookmarksParams = {
  collectionId: string;
  searchQuery: string | null;
};

export type CreateCollection = {
  body: {
    title: string;
    parentId: CollectionId;
  };
  temporaryId: string;
};

export type MoveCollection = {
  body: {
    parentId: CollectionId;
    index: number;
    collectionIds: CollectionId[];
  };
};

export type MoveBookmarks = {
  params: {
    collectionId: CollectionId;
  };
  body: {
    newCollectionId: CollectionId;
    index: number;
    bookmarkIds: number[];
  };
};

export type EditCollection = {
  collectionId: CollectionId;
  body: {
    title: string;
  };
};
