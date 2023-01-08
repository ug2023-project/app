import { CollectionState } from '../types';

const collectionInitialState: CollectionState = {
  collections: [],
  previousCollectionsUpdatedState: {},
  loading: false,
  error: '',
};

export default collectionInitialState;
