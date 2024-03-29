import { UniqueIdentifier } from '@dnd-kit/core';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { SortableProps } from './Sortable';
import Bookmark from '@/types/Bookmark';
import Item from './dnd-kit/Item';

const SortableItem = ({
  item,
  disabled,
  animateLayoutChanges,
  id,
  index,
  onRemove,
  wrapperStyle,
  disableSorting = false,
}: SortableItemProps) => {
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
      type: 'bookmark',
    },
  });

  return (
    <Item
      item={item}
      ref={setNodeRef}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      onRemove={() => onRemove(id)}
      transform={disableSorting ? null : transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={isDragging}
      {...attributes}
    />
  );
};

type SortableItemProps = {
  item: Bookmark;
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  id: UniqueIdentifier;
  index: number;
  onRemove(id: UniqueIdentifier): void;
  wrapperStyle: SortableProps['wrapperStyle'];
  disableSorting?: boolean;
};

export default SortableItem;
