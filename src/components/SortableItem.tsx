import { UniqueIdentifier } from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  useSortable,
} from '@dnd-kit/sortable';
import { Item } from './dnd-kit';
import { SortableProps } from './Sortable';
import Bookmark from '@/types/Bookmark';
import DraggableType from '@/components/DraggableType';

interface SortableItemProps {
  item: Bookmark;
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  id: UniqueIdentifier;
  index: number;
  useDragOverlay?: boolean;
  onRemove(id: UniqueIdentifier): void;
  wrapperStyle: SortableProps['wrapperStyle'];
  disableSorting?: boolean;
}

export function SortableItem({
  item,
  disabled,
  animateLayoutChanges,
  id,
  index,
  onRemove,
  useDragOverlay,
  wrapperStyle,
  disableSorting = false,
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
    data: {
      type: DraggableType.BOOKMARK,
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
      onRemove={() => onRemove(id)}
      transform={disableSorting ? null : transform}
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
