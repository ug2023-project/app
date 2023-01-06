import Collection from '@/types/Collection';
import CollectionApi from '@/types/CollectionApi';
import CollectionApiResponse from '@/types/CollectionApiResponse';

const toCollection = (
  { id, title, ...rest }: CollectionApi,
  parentId: number | string,
): Collection => ({
  id,
  parent: parentId,
  text: title,
  droppable: true,
  data: {
    ...rest,
  },
});

const collectionApiMapper = ({
  rootCollectionOrder,
  collections,
}: CollectionApiResponse): Collection[] => {
  const normalizedCollections = collections.reduce<
    Record<number, CollectionApi>
  >((acc, collection) => {
    acc[collection.id] = collection;
    return acc;
  }, {});

  const recursiveAddChildren = (collection: Collection) =>
    collection.data?.childrenOrder.reduce<Collection[]>((acc, childId) => {
      const child = toCollection(normalizedCollections[childId], collection.id);
      acc.push(child, ...recursiveAddChildren(child));
      return acc;
    }, []) ?? [];

  const flattenedCollections: Collection[] = rootCollectionOrder.flatMap(
    (collectionId) => {
      const collection = toCollection(normalizedCollections[collectionId], 0);
      return [collection, ...recursiveAddChildren(collection)];
    },
  );

  return flattenedCollections;
};

export default collectionApiMapper;
