import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Button, Menu } from '@mantine/core';
import { RenderParams } from '@minoru/react-dnd-treeview';
import useNodeLogic from './useNodeLogic';
import styles from './Node.module.css';
import classNames from 'classnames';
import TreeCollection from '@/types/TreeCollection';
import useTypedSelector from '@/hooks/useTypedSelector';
import { BsThreeDots } from 'react-icons/bs';
import TypeIcon from '../Common/TypeIcon';
import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import {
  selectDraggingBookmarkIds,
  selectHasChildrenCollections,
} from '@/redux/selectors';
import { useParams } from 'react-router-dom';
import {
  moveBookmarksToCollection,
  updateSelectedBookmarks,
} from '@/containers/Dashboard/ducks/bookmarks/bookmarks.actions';
import useTypedDispatch from '@/hooks/useTypedDispatch';

const Node = ({ testIdPrefix = '', ...props }: NodeProps) => {
  const { collectionId } = useParams();
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useTypedDispatch();

  const { handleClick, handleToggle, indent, dragOverProps } = useNodeLogic({
    ...props,
  });
  const nodeStyles = classNames(styles.node, {
    [styles.nodeExpanded]: props.isOpen,
  });

  const hasChildren = useTypedSelector(
    selectHasChildrenCollections(props.node.id),
  );

  const draggingBookmarkIds = useTypedSelector(selectDraggingBookmarkIds);
  const isDraggingBookmarks = draggingBookmarkIds.length > 0;

  return (
    <>
      <div
        className={styles.container}
        style={{
          paddingInlineStart: indent,
          border: isDraggingBookmarks && isHover ? '1px dashed #ccc' : 'none',
        }}
        data-testid={`${testIdPrefix}custom-node-${props.node.id}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseUpCapture={() => {
          if (isDraggingBookmarks) {
            dispatch(updateSelectedBookmarks([]));
            if (collectionId === props.node.id.toString()) return;
            dispatch(
              moveBookmarksToCollection({
                params: {
                  collectionId: collectionId as unknown as number,
                },
                body: {
                  collectionId: props.node.id,
                  index: 0,
                  bookmarkIds: draggingBookmarkIds,
                },
              }),
            );
          }
        }}
        {...dragOverProps}
      >
        <div className={styles.contentContainer} onClick={handleClick}>
          {hasChildren ? (
            <div className={nodeStyles}>
              {props.node.droppable && (
                <div onClick={handleToggle}>
                  <ChevronRightIcon
                    data-testid={`arrow-right-icon-${props.node.id}`}
                    className={styles.arrow}
                  />
                </div>
              )}
            </div>
          ) : (
            // make indent when no children
            <div style={{ width: '20px' }}></div>
          )}
          <TypeIcon />
          <div className={styles.textSpace}>
            <p
              className={classNames(styles.nodeText, {
                [styles.nodeTextSelected]: props.isSelected,
              })}
            >
              {props.node.text}
            </p>
          </div>
        </div>
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
            <Menu.Item onClick={() => setIsModalOpen(true)}>
              Create nested collections
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>Rename</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <CreateCollectionModal
          parentId={props.node.id}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

type NodeProps = RenderParams & {
  node: TreeCollection;
  isSelected: boolean;
  isDragging: boolean;
  testIdPrefix?: string;
  onClick: (e: React.MouseEvent, node: TreeCollection) => void;
  onToggle: (id: TreeCollection['id']) => void;
};

export default Node;
