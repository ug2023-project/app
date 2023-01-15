import { BookmarkState } from '../types';

const bookmarkInitialState: BookmarkState = {
  bookmarks: {},
  previousBookmarks: {},
  currentSearch: [],
  draggingIds: [],
  loading: false,
  error: null,
};

export default bookmarkInitialState;
