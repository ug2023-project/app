import { useCallback, useState } from 'react';
import { useDragOver } from '@minoru/react-dnd-treeview';
import Collection from '@/types/Collection';

import styles from './Node.module.css';

const useNodeLogic = ({
  onTextChange,
  onToggle,
  onClick,
  node,
  depth,
  isSelected,
  isDragging,
  containerRef,
  isOpen,
}: UseNodeLogicProps) => {
  const [labelText, setLabelText] = useState(node.text);
  const [visibleInput, setVisibleInput] = useState(false);
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

  const handleShowInput = useCallback(() => {
    setVisibleInput(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisibleInput(false);
    setLabelText(node.text);
  }, [node.text]);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabelText(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setVisibleInput(false);
    onTextChange(node.id, labelText);
  }, [onTextChange, node.id, labelText]);

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
  };
};

type UseNodeLogicProps = {
  onTextChange: (id: Collection['id'], value: string) => void;
  onClick: (e: React.MouseEvent, node: Collection) => void;
  onToggle: (id: Collection['id']) => void;
  node: Collection;
  depth: number;
  isSelected: boolean;
  isDragging: boolean;
  containerRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
};

export default useNodeLogic;
