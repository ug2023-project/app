import Bookmark from '@/types/Bookmark';
import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';

export type CollectionState = {
  ids: UniqueIdentifier[];

  collections: Partial<Record<UniqueIdentifier, Collection>>;
  previousIds: UniqueIdentifier[] | null;
  previousCollections: Partial<Record<number, Collection>> | null;
  loading: boolean;
  error: string | null;
};

export type BookmarkState = {
  bookmarks: Partial<Record<UniqueIdentifier, Bookmark>>;
  previousBookmarks: Partial<Record<UniqueIdentifier, Bookmark>> | null;
  currentSearch: Bookmark[];
  draggingIds: UniqueIdentifier[];
  dropDisabled: boolean;
  loading: boolean;
  error: string | null;
};

export type FetchCollectionBookmarksParams = {
  collectionId: UniqueIdentifier;
  searchQuery: string | null;
};

export type CreateCollection = {
  body: {
    title: string;
    parentId: UniqueIdentifier;
  };
};

export type MoveCollection = {
  body: {
    parentId: UniqueIdentifier | null;
    index: number;
    collectionId: UniqueIdentifier;
  };
};

export type MoveBookmarks = {
  params: {
    collectionId: UniqueIdentifier;
  };
  body: {
    collectionId: UniqueIdentifier;
    index: number;
    bookmarkIds: UniqueIdentifier[];
  };
};

export type EditCollection = {
  collectionId: UniqueIdentifier;
  body: {
    title: string;
  };
};

export type CreateBookmark = {
  collectionId: UniqueIdentifier;
  bookmark: Partial<Bookmark>;
};
