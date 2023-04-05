import { BookmarkState } from '../types';

const bookmarkInitialState: BookmarkState = {
  bookmarks: {},
  previousBookmarks: {},
  currentSearch: [],
  dropDisabled: false,
  loading: false,
  error: null,
  dndOptions: {
    draggingIds: [],
    activeId: null,
  },
};

export default bookmarkInitialState;
