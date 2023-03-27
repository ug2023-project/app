import { useParams, useSearchParams } from 'react-router-dom';
import styles from './BookmarkList.module.css';
import useTypedSelector from '@/hooks/useTypedSelector';
import { useEffect, useMemo, useState } from 'react';
import {
  selectCollectionBookmarks,
  selectCurrentSearchBookmarks,
  selectDropDisabled,
} from '@/redux/selectors';
import BookmarkItem from '@/containers/Dashboard/BookmarkList/BookmarkItem';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { fetchCollectionBookmarksSearch } from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';
import { Sortable, SortableProps } from '@/components/Sortable';
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { MeasuringStrategy } from '@dnd-kit/core';
import { GridContainer } from '@/components/GridContainer';

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
  const collectionId = parseInt(params.collectionId as unknown as string);
  const dispatch = useTypedDispatch();
  const [isList, setIsList] = useState(true);
  const [props, setProps] = useState<Partial<SortableProps>>(listProps);

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

  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return (
    <main className={styles.bookmarkList}>
      <div>
        {JSON.stringify(isSearchResult)}
        <br />
        <br />
        <button
          onClick={() => {
            setIsList(!isList);
            setProps(isList ? gridProps : listProps);
          }}
          style={{ border: '1px solid red' }}
        >
          Click me
        </button>
        <Sortable
          {...props}
          items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          animateLayoutChanges={animateLayoutChanges}
          measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
          removable
        />
      </div>
    </main>
  );
};

export default BookmarkList;
