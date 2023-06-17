import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Active,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
import List from './dnd-kit/List';
import Wrapper from './dnd-kit/Wrapper';
import SortableItem from './SortableItem';
import {
  useChangeBookmarksOrderMutation,
  useRemoveBookmarkMutation,
} from '../services/bookmarks';

const Sortable = ({
  animateLayoutChanges,
  Container = List,
  bookmarks = [],
  strategy = rectSortingStrategy,
  wrapperStyle = () => ({}),
  disableSorting = false,
}: SortableProps) => {
  const [changeBookmarksOrder] = useChangeBookmarksOrderMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const params = useParams();
  const collectionId = params.collectionId ?? '';

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const getIndex = (id: UniqueIdentifier) =>
    bookmarks.findIndex((b) => b.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleRemove = (id: UniqueIdentifier) => {
    removeBookmark({ collectionId, bookmarkId: id });
  };

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
    if (activeIndex !== overIndex && over.data.current?.type === 'bookmark') {
      changeBookmarksOrder({
        collectionId,
        bookmarkId: active.id,
        index: overIndex,
      });
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
      <Wrapper center>
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
                disableSorting={disableSorting}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {createPortal(
        <DragOverlay>
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
      )}
    </>
  );
};

export type SortableProps = {
  animateLayoutChanges?: AnimateLayoutChanges;
  Container?: any; // To-do: Fix me
  bookmarks: Bookmark[];
  strategy?: SortingStrategy;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  disableSorting?: boolean;
};

export default Sortable;
