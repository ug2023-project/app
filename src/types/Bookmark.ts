import { UniqueIdentifier } from '@dnd-kit/core';

type Bookmark = {
  id: UniqueIdentifier;
  link: string;
  title: string;
  description: string;
  favorite: boolean;
  collectionId: UniqueIdentifier;
  tags: string[];
  image: string;
  type: 'WEBSITE' | 'FILE';
  status: 'NEW' | 'SUCCESS' | 'ERROR';
  createdAt: string;
};

export default Bookmark;
