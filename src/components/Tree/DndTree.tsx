import { DndProvider } from 'react-dnd'
import { getBackendOptions, MultiBackend, Tree } from '@minoru/react-dnd-treeview'

import TreeData from './TreeData'
import useTreeLogic from './useTreeLogic'

const DndTree = ({ data }: DndTreeProps) => {
  const {
    handleDragEnd,
    handleDragStart,
    handleDrop,
    treeData,
    handleDragPreviewRender,
    handleCanDrop,
    handleRender,
    handlePlaceholderRender,
  } = useTreeLogic({ data })

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        render={handleRender}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragPreviewRender={handleDragPreviewRender}
        onDrop={handleDrop}
        classes={{
          root: 'h-full',
          draggingSource: 'opacity-[0.3]',
          placeholder: 'relative',
        }}
        sort={false}
        enableAnimateExpand
        insertDroppableFirst={false}
        canDrop={handleCanDrop}
        dropTargetOffset={10}
        placeholderRender={handlePlaceholderRender}
      />
    </DndProvider>
  )
}

type DndTreeProps = {
  data: TreeData
}

export default DndTree
