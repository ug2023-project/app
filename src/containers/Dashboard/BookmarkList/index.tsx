import { useParams, useSearchParams } from 'react-router-dom';
import styles from './BookmarkList.module.css';
import useTypedSelector from '@/hooks/useTypedSelector';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMemo } from 'react';
import {
  selectCollectionBookmarks,
  selectCurrentSearchBookmarks,
  selectDraggingBookmarkIds,
} from '@/redux/selectors';
import BookmarkItem from '@/containers/Dashboard/BookmarkList/BookmarkItem';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { updateSelectedBookmarks } from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

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

  const items = bookmarks.map((item, index) => (
    <BookmarkItem key={item.id} index={index} item={item} />
  ));

  return (
    <main className={styles.bookmarkList}>
      <div>
        CollectionId: {collectionId}, IsSearching:{' '}
        {JSON.stringify(isSearchResult)}
      </div>
      <DragDropContext
        onBeforeCapture={({ draggableId }) => {
          dispatch(updateSelectedBookmarks([parseInt(draggableId)]));
        }}
        onDragEnd={({ destination, source }) => {
          if (!destination) return;
          dispatch(updateSelectedBookmarks([]));
          const newItems = reorder(bookmarks, source.index, destination.index);
          console.log('newItems', newItems);
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
};

export default BookmarkList;
