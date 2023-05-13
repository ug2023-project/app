import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  defaultDropAnimation,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  flattenTree,
  getChildCount,
  getProjection,
  removeChildrenOf,
} from './utilities';
import type { FlattenedItem, TreeItems } from './types';
import { CSS } from '@dnd-kit/utilities';
import TreeItem from './TreeItem';
import {
  useMoveCollectionMutation,
  useToggleCollectionCollapsedMutation,
} from '../../services/bookmarks';

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

type SortableTreeProps = {
  items?: TreeItems;
  dragDisabled?: boolean;
  indentationWidth?: number;
};

export function SortableTree({
  items = [],
  dragDisabled = false,
  indentationWidth = 50,
}: SortableTreeProps) {
  const [moveCollection] = useMoveCollectionMutation();
  const [toggleCollectionCollapsed] = useToggleCollectionCollapsedMutation();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      [],
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems,
    );
  }, [activeId, items]);

  const projected =
    activeId && overId && !dragDisabled
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth,
        )
      : null;

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems],
  );

  const activeItem = useMemo(
    () => (activeId ? flattenedItems.find(({ id }) => id === activeId) : null),
    [activeId, flattenedItems],
  );

  const handleDragStart = ({
    active: { id: activeId, data },
  }: DragStartEvent) => {
    if (data.current?.type !== 'tree-item') return;
    setActiveId(activeId);
    setOverId(activeId);

    document.body.style.setProperty('cursor', 'grabbing');
  };

  const handleDragMove = ({ delta, active: { data } }: DragMoveEvent) => {
    if (data.current?.type !== 'tree-item') return;
    setOffsetLeft(delta.x);
  };

  function handleDragOver({ over, active: { data } }: DragOverEvent) {
    if (data.current?.type !== 'tree-item') return;
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over, active: { data } }: DragEndEvent) {
    if (data.current?.type !== 'tree-item') return;
    resetState();

    if (projected && over) {
      const { parentId } = projected;
      const clonedItems = JSON.parse(
        JSON.stringify(flattenTree(items)),
      ) as FlattenedItem[];
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);

      moveCollection({
        parentId: parentId,
        collectionId: active.id,
        index: overIndex,
      });
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);

    document.body.style.setProperty('cursor', '');
  }

  function handleCollapse(id: UniqueIdentifier) {
    toggleCollectionCollapsed(id);
  }

  useDndMonitor({
    onDragStart(event) {
      handleDragStart(event);
    },
    onDragMove(event) {
      handleDragMove(event);
    },
    onDragOver(event) {
      handleDragOver(event);
    },
    onDragEnd(event) {
      handleDragEnd(event);
    },
    onDragCancel() {
      handleDragCancel();
    },
  });

  return (
    <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
      {flattenedItems.map(
        ({ id, title, children, collapsed, depth, bookmarks, color }) => (
          <TreeItem
            key={id}
            id={id}
            value={title}
            depth={id === activeId && projected ? projected.depth : depth}
            indentationWidth={indentationWidth}
            collapsed={Boolean(collapsed && children.length)}
            onCollapse={children.length ? () => handleCollapse(id) : undefined}
            draggable={!dragDisabled}
            bookmarks={bookmarks}
            color={color}
          />
        ),
      )}
      {createPortal(
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeId && activeItem ? (
            <TreeItem
              id={activeId}
              depth={activeItem.depth}
              clone
              childCount={getChildCount(items, activeId) + 1}
              value={activeItem.title}
              indentationWidth={indentationWidth}
              color={activeItem.color}
            />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </SortableContext>
  );
}
