import CollectionApi from './CollectionApi';

type TreeCollectionData = Omit<CollectionApi, 'id' | 'title'>;

export default TreeCollectionData;
