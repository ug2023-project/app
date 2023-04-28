import { UniqueIdentifier } from '@dnd-kit/core';
import Collection from '@/types/Collection';

type CollectionState = {
  ids: UniqueIdentifier[];
  collections: Partial<Record<UniqueIdentifier, Collection>>;
  previousIds: UniqueIdentifier[] | null;
  previousCollections: Partial<Record<number, Collection>> | null;
  loading: boolean;
  error: string | null;
};

const collectionsInitialState: CollectionState = {
  ids: [],
  collections: {},
  previousIds: [],
  previousCollections: {},
  loading: false,
  error: null,
};

export default collectionsInitialState;
