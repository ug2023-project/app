import { CollectionState } from '../types';

const collectionInitialState: CollectionState = {
  collections: {
    rootCollectionOrder: [],
    collections: [],
  },
  loading: false,
  error: '',
};

export default collectionInitialState;
