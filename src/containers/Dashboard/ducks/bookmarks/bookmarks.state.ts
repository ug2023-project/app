import { BookmarkState } from '../types';

const bookmarkInitialState: BookmarkState = {
  bookmarks: {},
  previousBookmarks: {},
  currentSearch: [],
  loading: false,
  error: null,
};

export default bookmarkInitialState;
