import CollectionApi from './CollectionApi';

type CollectionData = Omit<CollectionApi, 'id' | 'title'>;

export default CollectionData;
