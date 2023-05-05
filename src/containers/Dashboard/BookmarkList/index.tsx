import { useParams, useSearchParams } from 'react-router-dom';
import styles from './BookmarkList.module.css';
import useTypedSelector from '@/hooks/useTypedSelector';
import { useEffect, useMemo, useState } from 'react';
import {
  selectCollectionBookmarks,
  selectCurrentSearchBookmarks,
} from '@/redux/selectors';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { SortableProps } from '@/components/Sortable';
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@mantine/core';
import fetchCollectionBookmarksSearch from '../ducks/bookmarks/actions/fetchCollectionBookmarkSearch';
import Sortable from '@/components/Sortable';
import GridContainer from '@/components/GridContainer';

const listProps: Partial<SortableProps> = {
  strategy: verticalListSortingStrategy,
};

const gridProps: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

const BookmarkList = () => {
  const [searchParams] = useSearchParams();
  const isSearchResult = useMemo(
    () => [...searchParams.keys()].length > 0,
    [searchParams],
  );
  const params = useParams();
  const collectionId = parseInt(params.collectionId as string);
  const dispatch = useTypedDispatch();
  const [isList, setIsList] = useState(true);
  const [props, setProps] = useState<Partial<SortableProps>>(listProps);

  const bookmarks = useTypedSelector(
    isSearchResult
      ? selectCurrentSearchBookmarks
      : selectCollectionBookmarks(collectionId),
  );

  useEffect(() => {
    dispatch(
      fetchCollectionBookmarksSearch({
        collectionId: collectionId,
        searchQuery: searchParams.get('search') ?? '',
      }),
    );
  }, [collectionId, searchParams]);

  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return (
    <main className={styles.bookmarkList}>
      <div>
        <Button
          onClick={() => {
            setIsList(!isList);
            setProps(isList ? gridProps : listProps);
          }}
          style={{ border: '1px solid green' }}
        >
          Change view
        </Button>
        <Sortable
          {...props}
          bookmarks={bookmarks}
          animateLayoutChanges={animateLayoutChanges}
          disableSorting={collectionId === 0}
        />
      </div>
    </main>
  );
};

export default BookmarkList;
