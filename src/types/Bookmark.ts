import BookmarkType from './BookmarkType';
import { UniqueIdentifier } from '@dnd-kit/core';

type Bookmark = {
  id: UniqueIdentifier;
  link: string;
  title: string;
  description: string;
  favorite: boolean;
  deleted: boolean;
  cacheUrl: string | null;
  authorId: number;
  collectionId: number | string;
  tags: string[];
  image: string;
  icon: string;
  type: BookmarkType;
};

export default Bookmark;
