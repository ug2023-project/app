import Bookmark from '@/types/Bookmark';
import CollectionApiResponse from '@/types/CollectionApiResponse';

export type CollectionState = {
  collections: CollectionApiResponse;
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


