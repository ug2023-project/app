import CollectionApi from '@/types/CollectionApi';
import CollectionApiResponse from '@/types/CollectionApiResponse';

const collectionApiMapper = ({rootCollectionOrder, collections}: CollectionApiResponse) => {
  const collectionToReturn: CollectionApi[] = [];

  const recursiveCheck = (collectionId: number, newCollections: CollectionApi[]) => {
    const collectionToCheck = collections.find((collection) => collection.id === collectionId);

    if (!collectionToCheck) {
      throw new Error('Collection not found, should not happen');
    }

    collectionToReturn.push(collectionToCheck);
    if (collectionToCheck.childrenOrder.length === 0) {
      return newCollections; 
    }

    for (const childrenCollection of collectionToCheck.childrenOrder) {
      const childrenCollectionData = collections.find((collection) => collection.id === childrenCollection);
      if (!childrenCollectionData) continue;
      recursiveCheck(childrenCollection, [childrenCollectionData]);
    }
  };


  for (const collectionOrder of rootCollectionOrder) {
    const rootCollection = collections.find((collection) => collection.id === collectionOrder);
    if (!rootCollection) continue;
    recursiveCheck(collectionOrder, [rootCollection]);
  }

  return collectionToReturn;
};

export default collectionApiMapper;