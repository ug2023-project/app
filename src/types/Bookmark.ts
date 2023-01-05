import BookmarkType from './BookmarkType';

type Bookmark = {
    id: number;
    link: string;
    title: string;
    description: string;
    favorite: boolean;
    deleted: boolean;
    cacheUrl: string | null;
    authorId: number;
    collectionId: number;
    tags: string[];
    image: string;
    icon: string;
    type: BookmarkType;
};

export default Bookmark;