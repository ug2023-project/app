import TreeCollection, { CollectionId } from '@/types/TreeCollection';
import CollectionApi from '@/types/CollectionApi';
// import CollectionApiResponse from '@/types/CollectionApiResponse';

export const toCollection = (
  { id, title, ...rest }: CollectionApi,
  parentId: CollectionId,
): TreeCollection => ({
  id,
  parent: parentId,
  text: title,
  droppable: true,
  data: {
    ...rest,
  },
});

export const normalizeCollectionsApi = (
  collections: CollectionApi[],
): Record<CollectionId, TreeCollection> =>
  collections.reduce<Record<CollectionId, TreeCollection>>(
    (acc, collection) => {
      acc[collection.id] = toCollection(collection, collection.parentId ?? 0);
      return acc;
    },
    {},
  );

// const collectionApiMapper = ({
//   collectionOrder,
//   collections: apiCollections,
// }: CollectionApiResponse): Collection[] => {
//   const normalizedApiCollections = apiCollections.reduce<
//     Record<CollectionId, CollectionApi>
//   >((acc, collection) => {
//     acc[collection.id] = collection;
//     return acc;
//   }, {});

//   const recursiveAddChildren = (collection: Collection): Collection[] => {
//     const children = collection.data?.childrenOrder.map((childId) => toCollection(normalizedApiCollections[childId], collection.id)) ?? [];
//     return [
//       ...children,
//       ...children.flatMap(recursiveAddChildren),
//     ];
//   };

//   const flattenedCollections: Collection[] = [
//     ...collectionOrder.map((collectionId) => toCollection(normalizedApiCollections[collectionId], 0)),
//     ...collectionOrder.flatMap((collectionId) => recursiveAddChildren(toCollection(normalizedApiCollections[collectionId], 0))),
//   ];

//   return flattenedCollections;
// };

// export default collectionApiMapper;
