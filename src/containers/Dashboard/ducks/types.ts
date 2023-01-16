import Bookmark from '@/types/Bookmark';
import TreeCollection, { CollectionId } from '@/types/TreeCollection';

export type CollectionState = {
  ids: CollectionId[];
  collections: Partial<Record<CollectionId, TreeCollection>>;
  previousIds: CollectionId[] | null;
  previousCollections: Partial<Record<CollectionId, TreeCollection>> | null;
  loading: boolean;
  error: string | null;
};

export type BookmarkState = {
  bookmarks: Partial<Record<number | string, Bookmark>>;
  previousBookmarks: Partial<Record<number | string, Bookmark>> | null;
  currentSearch: Bookmark[];
  draggingIds: number[];
  dropDisabled: boolean;
  loading: boolean;
  error: string | null;
};

export type FetchCollectionBookmarksParams = {
  collectionId: number | string;
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
    collectionId: CollectionId;
    index: number;
    bookmarkIds: (number | string)[];
  };
};

export type EditCollection = {
  collectionId: CollectionId;
  body: {
    title: string;
  };
};

export type CreateBookmark = {
  collectionId: CollectionId;
  bookmark: Partial<Bookmark>;
};
