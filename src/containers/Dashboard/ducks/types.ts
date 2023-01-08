import Bookmark from '@/types/Bookmark';
import Collection from '@/types/Collection';

export type CollectionState = {
  collections: Collection[];
  previousCollections: Collection[] | null;
  loading: boolean;
  error: string;
};

export type BookmarkState = {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string;
};

export type FetchCollectionBookmarksParams = {
  collectionId: string;
  searchQuery: string | null;
};

export type MoveCollection = {
  params: {
    collectionId: string | number | undefined;
  };
  body: {
    collectionId: string | number | undefined;
    index: number | undefined;
    collectionIds: (string | number)[];
  };
  newTree: Collection[];
};
