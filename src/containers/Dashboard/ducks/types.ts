import Bookmark from '@/types/Bookmark';
import Collection from '@/types/Collection';

export type CollectionState = {
  collections: Collection[];
  loading: boolean;
  error: string;
};

export type BookmarkState = {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string;
}

export type FetchCollectionBookmarksParams = {
  collectionId: string;
  searchQuery: string | null;
}


