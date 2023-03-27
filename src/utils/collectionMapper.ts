import { TreeItem } from '@/components/Tree/types';
import Collection from '@/types/CollectionApi';
import { UniqueIdentifier } from '@dnd-kit/core';
// import CollectionApiResponse from '@/types/CollectionApiResponse';

export const toTreeItem = (
  { id, title, ...rest }: Collection,
  parentId: UniqueIdentifier,
): TreeItem => ({
  id,
  parent: parentId,
  text: title,
  droppable: true,
  data: {
    ...rest,
  },
});

export const normalizeCollectionsApi = (
  collections: Collection[],
): Record<number, TreeItem> =>
  collections.reduce<Record<number, TreeItem>>((acc, collection) => {
    acc[collection.id] = toTreeItem(collection, collection.parentId ?? 0);
    return acc;
  }, {});

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
