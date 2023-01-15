import BookmarkType from './BookmarkType';
import { CollectionId } from '@/types/TreeCollection';

type Bookmark = {
  id: number;
  link: string;
  title: string;
  description: string;
  favorite: boolean;
  deleted: boolean;
  cacheUrl: string | null;
  authorId: number;
  collectionId: CollectionId;
  tags: string[];
  image: string;
  icon: string;
  type: BookmarkType;
};

export default Bookmark;
