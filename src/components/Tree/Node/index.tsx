import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import {
  CheckIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Input } from '@mantine/core';
import { NodeModel, RenderParams } from '@minoru/react-dnd-treeview';
import { TypeIcon } from '../Common/TypeIcon';
import useNodeLogic from './useNodeLogic';
import styles from './Node.module.css';
import classNames from 'classnames';

const Node = ({
  testIdPrefix = '',
  node,
  isSelected,
  isDragging,
  onClick,
  onToggle,
  onTextChange,
  depth,
  isOpen,
  containerRef,
}: NodeProps) => {
  const {
    labelText,
    visibleInput,
    handleClick,
    handleToggle,
    handleShowInput,
    handleCancel,
    handleChangeText,
    handleSubmit,
    indent,
    dragOverProps,
  } = useNodeLogic({
    node,
    onClick,
    onToggle,
    onTextChange,
    depth,
    isSelected,
    isDragging,
    containerRef,
    isOpen,
  });
  const nodeStyles = classNames(styles.node, {
    [styles.nodeExpanded]: isOpen,
  });

  return (
    <div
      className={styles.container}
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${node.id}`}
      onClick={handleClick}
      {...dragOverProps}
    >
      <div className={nodeStyles}>
        {node.droppable && (
          <div onClick={handleToggle}>
            <ChevronRightIcon
              data-testid={`arrow-right-icon-${node.id}`}
              className={styles.arrow}
            />
          </div>
        )}
      </div>
      <div>
        <TypeIcon />
      </div>
      {visibleInput ? (
        <div className={styles.centerVertical}>
          <Input
            placeholder={node.text}
            value={labelText}
            onChange={handleChangeText}
          />
          <div className={styles.iconWrapper} onClick={handleSubmit}>
            <CheckIcon className={styles.full} />
          </div>
          <div className={styles.iconWrapper} onClick={handleCancel}>
            <XMarkIcon className={styles.full} />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.textSpace}>
            <p>{node.text}</p>
          </div>
          <div className={styles.iconWrapper} onClick={handleShowInput}>
            <PencilIcon className={styles.full} />
          </div>
        </>
      )}
    </div>
  );
};

type NodeProps = RenderParams & {
  node: NodeModel;
  isSelected: boolean;
  isDragging: boolean;
  testIdPrefix?: string;
  onClick: (e: React.MouseEvent, node: NodeModel) => void;
  onToggle: (id: NodeModel['id']) => void;
  onTextChange: (id: NodeModel['id'], value: string) => void;
};

export default Node;
