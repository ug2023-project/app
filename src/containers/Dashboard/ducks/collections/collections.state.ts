import { CollectionState } from '../types';

const collectionsInitialState: CollectionState = {
  ids: [],
  collections: {},
  previousIds: [],
  previousCollections: {},
  loading: false,
  error: null,
};

export default collectionsInitialState;
