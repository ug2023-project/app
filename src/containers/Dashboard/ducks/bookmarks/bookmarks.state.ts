import { BookmarkState } from '../types';

const bookmarkInitialState: BookmarkState = {
  bookmarks: {},
  currentSearch: [],
  draggingIds: [],
  loading: false,
  error: null,
};

export default bookmarkInitialState;
