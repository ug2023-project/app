import { Outlet, useParams } from 'react-router-dom';
import styles from './MainLayout.module.css';
import React from 'react';
import {
  DndProvider,
  getBackendOptions,
  MultiBackend,
} from '@minoru/react-dnd-treeview';
import {
  moveBookmarksToCollection,
  updateSelectedBookmarks,
} from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';
import { DragDropContext } from 'react-beautiful-dnd';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';
import { selectDraggingBookmarkIds } from '@/redux/selectors';

const MainLayout = ({ asideContent, searchBarContent }: MainLayoutProps) => {
  const dispatch = useTypedDispatch();
  const params = useParams();
  const collectionId = parseInt(params.collectionId as unknown as string);
  const draggingBookmarkIds = useTypedSelector(selectDraggingBookmarkIds);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <DragDropContext
        onBeforeCapture={({ draggableId }) => {
          dispatch(
            updateSelectedBookmarks([parseInt(draggableId.split('-')[0])]),
          );
        }}
        onDragEnd={({ destination }) => {
          dispatch(updateSelectedBookmarks([]));
          if (!destination) return;
          if (destination.droppableId === 'collection-tree') return;
          dispatch(
            moveBookmarksToCollection({
              params: {
                collectionId,
              },
              body: {
                collectionId,
                index: destination.index,
                bookmarkIds: draggingBookmarkIds,
              },
            }),
          );
        }}
      >
        <div className={styles.layout}>
          {asideContent}
          <div className={styles.main}>
            {searchBarContent}
            <Outlet />
          </div>
        </div>
      </DragDropContext>
    </DndProvider>
  );
};

type MainLayoutProps = {
  asideContent: React.ReactNode;
  searchBarContent: React.ReactNode;
};

export default MainLayout;
