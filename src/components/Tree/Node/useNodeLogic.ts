import React, { useCallback } from 'react';
import { useDragOver } from '@minoru/react-dnd-treeview';
import TreeCollection from '@/types/TreeCollection';

import styles from './Node.module.css';

const useNodeLogic = ({
  onToggle,
  onClick,
  node,
  depth,
  isSelected,
  isDragging,
  containerRef,
  isOpen,
}: UseNodeLogicProps) => {
  const indent = depth * 24;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick(e, node);
    },
    [node, onClick],
  );

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle(node.id);
    },
    [node.id, onToggle],
  );

  const dragOverProps = useDragOver(node.id, isOpen, onToggle);

  if (isSelected) {
    containerRef.current?.classList.add(styles.isSelected);
  } else {
    containerRef.current?.classList.remove(styles.isSelected);
  }

  if (isDragging) {
    containerRef.current?.classList.add(styles.isDragging);
  } else {
    containerRef.current?.classList.remove(styles.isDragging);
  }

  return {
    handleClick,
    handleToggle,
    indent,
    dragOverProps,
  };
};

type UseNodeLogicProps = {
  onClick: (e: React.MouseEvent, node: TreeCollection) => void;
  onToggle: (id: TreeCollection['id']) => void;
  node: TreeCollection;
  depth: number;
  isSelected: boolean;
  isDragging: boolean;
  containerRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
};

export default useNodeLogic;
