import React from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import {
  CheckIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Input } from '@mantine/core';
import { RenderParams } from '@minoru/react-dnd-treeview';
import { TypeIcon } from '../Common/TypeIcon';
import useNodeLogic from './useNodeLogic';
import styles from './Node.module.css';
import classNames from 'classnames';
import Collection from '@/types/Collection';

const Node = ({ testIdPrefix = '', ...props }: NodeProps) => {
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
    ...props,
  });
  const nodeStyles = classNames(styles.node, {
    [styles.nodeExpanded]: props.isOpen,
  });

  return (
    <div
      className={styles.container}
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${props.node.id}`}
      onClick={handleClick}
      {...dragOverProps}
    >
      <div className={styles.contentContainer}>
        <div className={nodeStyles}>
          {props.node.droppable &&
            (props.node.data?.childrenOrder.length as number) > 0 && (
            <div onClick={handleToggle}>
              <ChevronRightIcon
                data-testid={`arrow-right-icon-${props.node.id}`}
                className={styles.arrow}
              />
            </div>
          )}
        </div>
        <TypeIcon isOpen={props.isOpen} />
        {!visibleInput && (
          <div className={styles.textSpace}>
            <p
              className={classNames(styles.nodeText, {
                [styles.nodeTextSelected]: props.isSelected,
              })}
            >
              {props.node.text}
            </p>
          </div>
        )}
      </div>
      {visibleInput ? (
        <div className={styles.centerVertical}>
          <Input
            placeholder={props.node.text}
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
        <div className={styles.iconWrapper} onClick={handleShowInput}>
          <PencilIcon className={styles.full} />
        </div>
      )}
    </div>
  );
};

type NodeProps = RenderParams & {
  node: Collection;
  isSelected: boolean;
  isDragging: boolean;
  testIdPrefix?: string;
  onClick: (e: React.MouseEvent, node: Collection) => void;
  onToggle: (id: Collection['id']) => void;
  onTextChange: (id: Collection['id'], value: string) => void;
};

export default Node;
