import { CollectionState } from '../types';

const collectionsInitialState: CollectionState = {
  ids: [],
  collections: {},
  previousIds: [],
  previousCollections: {},
  loading: false,
  error: null,
  dndOptions: {
    activeId: null,
    offsetLeft: 0,
  },
};

export default collectionsInitialState;
