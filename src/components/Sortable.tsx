import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Active,
  defaultDropAnimationSideEffects,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  rectSortingStrategy,
  SortableContext,
  SortingStrategy,
} from '@dnd-kit/sortable';

import Item from './dnd-kit/Item';
import Bookmark from '@/types/Bookmark';
import { useParams } from 'react-router-dom';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import removeBookmark from '@/containers/Dashboard/ducks/bookmarks/actions/removeBookmark';
import changeBookmarksOrder from '@/containers/Dashboard/ducks/bookmarks/actions/changeBookmarkOrder';
import List from './dnd-kit/List';
import Wrapper from './dnd-kit/Wrapper';
import SortableItem from './SortableItem';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const Sortable = ({
  animateLayoutChanges,
  adjustScale = false,
  Container = List,
  dropAnimation = dropAnimationConfig,
  bookmarks = [],
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
  disableSorting = false,
}: SortableProps) => {
  const dispatch = useTypedDispatch();
  const params = useParams();
  const collectionId = parseInt(params.collectionId as string);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: UniqueIdentifier) =>
    bookmarks.findIndex((b) => b.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleRemove = (id: UniqueIdentifier) => {
    dispatch(
      removeBookmark({
        collectionId,
        bookmarkId: parseInt(id.toString()),
      }),
    );
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (!active || active.data.current?.type !== 'bookmark') {
      return;
    }

    setActiveId(active.id);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (disableSorting || active.data.current?.type !== 'bookmark') {
      return;
    }
    setActiveId(null);

    if (!over) {
      return;
    }

    const overIndex = getIndex(over.id);
    if (activeIndex !== overIndex) {
      dispatch(
        changeBookmarksOrder({
          params: {
            collectionId,
          },
          body: {
            bookmarkIds: [parseInt(active.id.toString())],
            index: overIndex,
          },
        }),
      );
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  useDndMonitor({
    onDragStart(event) {
      handleDragStart(event);
    },
    onDragEnd(event) {
      handleDragEnd(event);
    },
    onDragCancel() {
      handleDragCancel();
    },
  });

  return (
    <>
      <Wrapper style={style} center>
        <SortableContext items={bookmarks} strategy={strategy}>
          <Container>
            {bookmarks.map((value, index) => (
              <SortableItem
                key={value.id}
                id={value.id}
                item={value}
                index={index}
                wrapperStyle={wrapperStyle}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                disableSorting={disableSorting}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  item={bookmarks.find((b) => b.id === activeId) as Bookmark}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: bookmarks.findIndex((b) => b.id === activeId),
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </>
  );
};

export type SortableProps = {
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  Container?: any; // To-do: Fix me
  dropAnimation?: DropAnimation | null;
  bookmarks: Bookmark[];
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  disableSorting?: boolean;
};

export default Sortable;
