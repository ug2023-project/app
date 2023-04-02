import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';

export const normalizeCollectionsApi = (
  collections: Collection[],
): Record<number, Collection> =>
  collections.reduce<Record<UniqueIdentifier, Collection>>(
    (acc, collection) => {
      acc[collection.id] = collection;
      return acc;
    },
    {},
  );
