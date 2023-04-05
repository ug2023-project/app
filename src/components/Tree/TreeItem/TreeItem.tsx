import React, { CSSProperties, HTMLAttributes, useState } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { iOS } from '../utilities';
import classNames from 'classnames';
import styles from '@/components/Tree/TreeItem/TreeItem.module.scss';
import { Action, Handle } from '@/components/dnd-kit';
import { UniqueIdentifier, useDndMonitor } from '@dnd-kit/core';
import { Button, Menu } from '@mantine/core';
import { BsThreeDots } from 'react-icons/bs';
import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import EditCollectionModal from '@/components/Modals/CollectionModal/EditCollectionModal';
import { useNavigate, useParams } from 'react-router-dom';

interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  id: UniqueIdentifier;
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indentationWidth: number;
  value: string | number;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => !(isSorting || wasDragging);

export function TreeItem({ id, depth, ...props }: Props) {
  const collectionId = useParams().collectionId;
  const navigate = useNavigate();
  const active = parseInt(collectionId ?? '') === id;

  const {
    attributes,
    isDragging,
    isSorting,
    isOver,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    data: {
      type: 'tree-item',
    },
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [isHover, setIsHover] = useState(false);
  const handleProps = {
    ...attributes,
    ...listeners,
  };

  const [isDraggingBookmark, setIsDraggingBookmark] = useState(false);

  useDndMonitor({
    onDragOver({ active: { data } }) {
      if (data.current?.type === 'list-item') {
        setIsDraggingBookmark(true);
        return;
      }
    },
    onDragEnd() {
      if (isOver && isDraggingBookmark) {
        console.log('Trying to drop bookmark on collection');
      }
      setIsDraggingBookmark(false);
      // handleDragEnd(event);
    },
  });

  return (
    <li
      className={classNames(
        styles.Wrapper,
        props.clone && styles.clone,
        isDragging && styles.ghost,
        iOS && styles.disableSelection,
        isSorting && styles.disableInteraction,
      )}
      ref={setDroppableNodeRef}
      style={
        {
          '--spacing': `${props.indentationWidth * depth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={classNames(
          styles.TreeItem,
          isHover && styles.hover,
          active && styles.active,
          isOver && isDraggingBookmark && styles.dropTarget,
        )}
        ref={setDraggableNodeRef}
        style={style}
        onClick={() => navigate(`/collections/${id}`)}
        draggable={true}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => setIsHover(false)}
      >
        <Handle {...handleProps} />
        {props.onCollapse && (
          <Action
            onClick={props.onCollapse}
            className={classNames(
              styles.Collapse,
              props.collapsed && styles.collapsed,
            )}
          >
            {collapseIcon}
          </Action>
        )}
        <span className={styles.Text}>{props.value}</span>
        {/* {!clone && onRemove && <Remove onClick={onRemove} />} */}
        <MenuButton id={id} />
        {props.clone && props.childCount && props.childCount > 1 ? (
          <span className={styles.Count}>{props.childCount}</span>
        ) : null}
      </div>
    </li>
  );
}

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
);

interface MenuButtonProps {
  id: UniqueIdentifier;
}

const MenuButton = ({ id }: MenuButtonProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button size="xs" compact>
            <BsThreeDots />
          </Button>
        </Menu.Target>

        <Menu.Dropdown
          style={{
            marginLeft: '80px',
          }}
        >
          <Menu.Item>Open all bookmarks</Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={() => setIsCreateModalOpen(true)}>
            Create nested collections
          </Menu.Item>
          <Menu.Item onClick={() => setIsEditModalOpen(true)}>
            Edit collection
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>Rename</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <CreateCollectionModal
        parentId={id}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      />
      <EditCollectionModal
        id={id}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
      />
    </>
  );
};
