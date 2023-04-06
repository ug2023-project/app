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
  arrayMove,
  NewIndexGetter,
  rectSortingStrategy,
  SortableContext,
  SortingStrategy,
} from '@dnd-kit/sortable';

import { Item, List, Wrapper } from '@/components/dnd-kit';
import { SortableItem } from './SortableItem';
import Bookmark from '@/types/Bookmark';
import DraggableType from '@/components/DraggableType';

export interface SortableProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  Container?: any; // To-do: Fix me
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  bookmarks: Bookmark[];
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export function Sortable({
  animateLayoutChanges,
  adjustScale = false,
  Container = List,
  dropAnimation = dropAnimationConfig,
  getNewIndex,
  bookmarks: initialBookmarks = [],
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
}: SortableProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(
    () => initialBookmarks,
  );

  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: UniqueIdentifier) =>
    bookmarks.findIndex((b) => b.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleRemove = (id: UniqueIdentifier) =>
    setBookmarks((bookmarks) =>
      bookmarks.filter((bookmark) => bookmark.id !== id),
    );

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  function handleDragStart({ active }: DragStartEvent) {
    if (!active || active.data.current?.type !== DraggableType.LIST_ITEM) {
      return;
    }

    setActiveId(active.id);
  }

  function handleDragEnd({ over, active }: DragEndEvent) {
    if (active.data.current?.type !== DraggableType.LIST_ITEM) {
      return;
    }
    setActiveId(null);

    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        setBookmarks((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  useDndMonitor({
    onDragStart(event) {
      handleDragStart(event);
    },
    // onDragMove(event) {},
    // onDragOver(event) {},
    onDragEnd(event) {
      handleDragEnd(event);
    },
    onDragCancel() {
      handleDragCancel();
    },
  });

  // sensors={sensors}
  // modifiers={modifiers}

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
                disabled={false}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
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
}
