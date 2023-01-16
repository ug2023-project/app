import { BookmarkState } from '../types';

const bookmarkInitialState: BookmarkState = {
  bookmarks: {},
  previousBookmarks: {},
  currentSearch: [],
  draggingIds: [],
  dropDisabled: false,
  loading: false,
  error: null,
};

export default bookmarkInitialState;
