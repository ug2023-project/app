import React, { CSSProperties, HTMLAttributes, memo, useState } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { iOS } from '../utilities';
import classNames from 'classnames';
import styles from '@/components/Tree/TreeItem/TreeItem.module.scss';
import Handle from '@/components/dnd-kit/Item/components/Handle';
import { UniqueIdentifier, useDndMonitor } from '@dnd-kit/core';
import { Button, Menu } from '@mantine/core';
import { BsThreeDots } from 'react-icons/bs';
import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import EditCollectionModal from '@/components/Modals/CollectionModal/EditCollectionModal';
import { useNavigate, useParams } from 'react-router-dom';
import Action from '@/components/dnd-kit/Item/components/Action';
import { useMoveBookmarkMutation } from '../../../services/bookmarks';

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => !(isSorting || wasDragging);

const TreeItem = ({
  id,
  depth,
  draggable = true,
  bookmarks,
  ...props
}: TreeItemProps) => {
  const collectionId = useParams().collectionId ?? '';
  const navigate = useNavigate();
  const isActive = collectionId === id;
  const [moveBookmark] = useMoveBookmarkMutation();

  const {
    attributes,
    isDragging,
    isSorting,
    over,
    active,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    disabled: draggable === false,
    animateLayoutChanges,
    data: {
      type: 'tree-item',
    },
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleProps = {
    ...attributes,
    ...listeners,
  };

  const dropAttempt =
    over?.id === id && active?.data.current?.type === 'bookmark';

  useDndMonitor({
    onDragEnd() {
      if (dropAttempt) {
        moveBookmark({
          collectionId,
          bookmarkId: active.id,
          newCollectionId: id,
        });
      }
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
          border: '1px solid red',
          '--spacing': `${props.indentationWidth * depth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={classNames(
          styles.TreeItem,
          isActive && styles.active,
          dropAttempt && styles.dropTarget,
        )}
        ref={setDraggableNodeRef}
        // {...handleProps}
        style={{ ...style, border: '1px solid green' }}
      >
        {draggable ? <Handle {...handleProps} /> : null}
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
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: props.color }}
        ></span>
        <span
          className={styles.Text}
          onClick={() => navigate(`/collections/${id}`)}
        >
          {props.value}
        </span>
        {bookmarks && <span>{bookmarks}</span>}
        <MenuButton id={id} />
        {props.clone && props.childCount && props.childCount > 1 ? (
          <span className={styles.Count}>{props.childCount}</span>
        ) : null}
      </div>
    </li>
  );
};

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
);

type MenuButtonProps = {
  id: UniqueIdentifier;
};

const MenuButton = memo(({ id }: MenuButtonProps) => {
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
});

type TreeItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'id' | 'color'> & {
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
  bookmarks?: number;
  color: string | null;
};

export default TreeItem;
