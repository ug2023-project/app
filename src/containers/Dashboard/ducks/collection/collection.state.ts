import { CollectionState } from '../types';

const collectionInitialState: CollectionState = {
  collections: [],
  previousCollections: [],
  loading: false,
  error: '',
};

export default collectionInitialState;
