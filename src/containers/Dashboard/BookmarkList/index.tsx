import { useParams, useSearchParams } from 'react-router-dom';
import styles from './BookmarkList.module.css';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Droppable } from 'react-beautiful-dnd';
import { useEffect, useMemo } from 'react';
import {
  selectCollectionBookmarks,
  selectCurrentSearchBookmarks,
  selectDropDisabled,
} from '@/redux/selectors';
import BookmarkItem from '@/containers/Dashboard/BookmarkList/BookmarkItem';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { fetchCollectionBookmarksSearch } from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';

const BookmarkList = () => {
  const [searchParams] = useSearchParams();
  const isSearchResult = useMemo(
    () => [...searchParams.keys()].length > 0,
    [searchParams],
  );
  const params = useParams();
  const collectionId = parseInt(params.collectionId as unknown as string);
  const dispatch = useTypedDispatch();

  const bookmarks = useTypedSelector(
    isSearchResult
      ? selectCurrentSearchBookmarks
      : selectCollectionBookmarks(collectionId),
  );

  const isDropDisabled = useTypedSelector(selectDropDisabled);

  useEffect(() => {
    dispatch(
      fetchCollectionBookmarksSearch({
        collectionId: collectionId,
        searchQuery: searchParams.get('search') ?? '',
      }),
    );
  }, [collectionId, dispatch, searchParams]);

  const items =
    bookmarks?.map((item, index) => (
      <BookmarkItem
        key={`${item.id}-${item.collectionId}`}
        index={index}
        item={item}
      />
    )) ?? [];

  return (
    <main className={styles.bookmarkList}>
      <div>
        CollectionId: {collectionId}, IsSearching:{' '}
        {JSON.stringify(isSearchResult)}
      </div>
      <Droppable
        droppableId="bookmark-list"
        direction="vertical"
        isDropDisabled={isDropDisabled}
      >
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </main>
  );
};

export default BookmarkList;
