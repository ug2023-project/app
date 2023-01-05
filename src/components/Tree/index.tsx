import { DndProvider } from 'react-dnd';
import {
  getBackendOptions,
  MultiBackend,
  Tree as DndTree,
} from '@minoru/react-dnd-treeview';
import TreeData from './TreeData';
import useTreeLogic from './useTreeLogic';
import styles from './Tree.module.css';

const Tree = ({ data }: DndTreeProps) => {
  const {
    handleDragEnd,
    handleDragStart,
    handleDrop,
    treeData,
    handleDragPreviewRender,
    handleCanDrop,
    handleRender,
    handlePlaceholderRender,
  } = useTreeLogic({ data });

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <DndTree
        tree={treeData}
        rootId={0}
        render={handleRender}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragPreviewRender={handleDragPreviewRender}
        onDrop={handleDrop}
        classes={{
          root: styles.root,
          draggingSource: styles.draggingSource,
          placeholder: styles.placeholder,
        }}
        sort={false}
        enableAnimateExpand
        insertDroppableFirst={false}
        canDrop={handleCanDrop}
        dropTargetOffset={10}
        placeholderRender={handlePlaceholderRender}
      />
    </DndProvider>
  );
};

type DndTreeProps = {
  data: TreeData;
};

export default Tree;