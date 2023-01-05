import Collection from '@/types/Collection';

export type CollectionState = {
  collections: Collection[];
  loading: boolean;
  error: string;
};

export type FetchCollectionParams = {
  collectionId: string;
  searchQuery: string | null;
}

