import { UniqueIdentifier } from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  useSortable,
} from '@dnd-kit/sortable';
import { Item } from './dnd-kit';
import { SortableProps } from './Sortable';
import Bookmark from '@/types/Bookmark';

interface SortableItemProps {
  item: Bookmark;
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  index: number;
  useDragOverlay?: boolean;
  onRemove?(id: UniqueIdentifier): void;
  wrapperStyle: SortableProps['wrapperStyle'];
}

export function SortableItem({
  item,
  disabled,
  animateLayoutChanges,
  getNewIndex,
  id,
  index,
  onRemove,
  useDragOverlay,
  wrapperStyle,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
    data: {
      type: 'list-item',
    },
  });

  return (
    <Item
      item={item}
      ref={setNodeRef}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}
