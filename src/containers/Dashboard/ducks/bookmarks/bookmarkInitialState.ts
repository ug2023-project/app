import Bookmark from '@/types/Bookmark';
import { UniqueIdentifier } from '@dnd-kit/core';

type BookmarkState = {
  bookmarks: Partial<Record<UniqueIdentifier, Bookmark>>;
  previousBookmarks: Partial<Record<UniqueIdentifier, Bookmark>> | null;
  currentSearch: Bookmark[];
  loading: boolean;
  error: string | null;
};

const bookmarkInitialState: BookmarkState = {
  bookmarks: {},
  previousBookmarks: {},
  currentSearch: [],
  loading: false,
  error: null,
};

export default bookmarkInitialState;
