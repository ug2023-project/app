import { useCallback, useState } from 'react'
import { DndProvider } from 'react-dnd'
import {
  DragLayerMonitorProps,
  DropOptions,
  getBackendOptions,
  isAncestor,
  MultiBackend,
  NodeModel,
  Tree,
} from '@minoru/react-dnd-treeview'

import CustomDragPreview from './CustomDragPreview'
import CustomNode from './CustomNode'
import FileProperties from './FileProperties'
import MultipleDragPreview from './MultipleDragPreview'
import Placeholder from './Placeholder'
import TreeData from './TreeData'
import useSelectNodeListener from './useSelectNodeListener'

const DndTree = ({ data }: DndTreeProps) => {
  const [selectedNodes, setSelectedNodes] = useState<TreeData>([])
  const [treeData, setTreeData] = useState(data)
  const [isDragging, setIsDragging] = useState(false)
  const [isCtrlPressing, setIsCtrlPressing] = useState(false)

  useSelectNodeListener({ setSelectedNodes, setIsCtrlPressing })

  const handleSingleSelect = useCallback((node: NodeModel<FileProperties>) => {
    setSelectedNodes([node])
  }, [])

  const handleMultiSelect = useCallback(
    (clickedNode: NodeModel<FileProperties>) => {
      const selectedIds = selectedNodes.map((n) => n.id)

      if (selectedIds.includes(clickedNode.id)) {
        return
      }

      if (selectedIds.some((selectedId) => isAncestor(treeData, selectedId, clickedNode.id))) {
        return
      }

      const updateNodes = [...selectedNodes].filter((selectedNode) => {
        return !isAncestor(treeData, clickedNode.id, selectedNode.id)
      })

      setSelectedNodes([...updateNodes, clickedNode])
    },
    [selectedNodes, treeData]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent, node: NodeModel<FileProperties>) => {
      if (e.ctrlKey || e.metaKey) {
        handleMultiSelect(node)
      } else {
        handleSingleSelect(node)
      }
    },
    [handleMultiSelect, handleSingleSelect]
  )

  const handleDragStart = useCallback(
    (node: NodeModel<FileProperties>) => {
      const isSelectedNode = selectedNodes.some((n) => n.id === node.id)
      setIsDragging(true)

      if (!isCtrlPressing && isSelectedNode) {
        return
      }

      if (!isCtrlPressing) {
        setSelectedNodes([node])
        return
      }

      if (!selectedNodes.some((n) => n.id === node.id)) {
        setSelectedNodes([...selectedNodes, node])
      }
    },
    [isCtrlPressing, selectedNodes]
  )

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setIsCtrlPressing(false)
    setSelectedNodes([])
  }, [])

  const handleDrop = useCallback(
    (newTree: TreeData, options: DropOptions<FileProperties>) => {
      const { dropTargetId } = options

      setTreeData(
        newTree.map((node) => {
          if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
            return {
              ...node,
              parent: dropTargetId,
            }
          }

          return node
        })
      )

      setSelectedNodes([])
    },
    [selectedNodes]
  )

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        render={(node, options) => {
          const selected = selectedNodes.some((selectedNode) => selectedNode.id === node.id)
          return (
            <CustomNode
              node={node}
              {...options}
              isSelected={selected}
              isDragging={selected && isDragging}
              onClick={handleClick}
            />
          )
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragPreviewRender={(monitorProps: DragLayerMonitorProps<FileProperties>) => {
          if (selectedNodes.length > 1) {
            return <MultipleDragPreview dragSources={selectedNodes} />
          }

          return <CustomDragPreview monitorProps={monitorProps} />
        }}
        onDrop={handleDrop}
        classes={{
          root: 'h-full',
          draggingSource: 'opacity-[0.3]',
          placeholder: 'relative',
        }}
        sort={false}
        enableAnimateExpand
        insertDroppableFirst={false}
        canDrop={(_tree, { dragSource, dropTargetId }) => {
          if (selectedNodes.some((selectedNode) => selectedNode.id === dropTargetId)) {
            return false
          }
          if (dragSource?.parent === dropTargetId) {
            return true
          }
        }}
        dropTargetOffset={10}
        placeholderRender={(_node, { depth }) => <Placeholder depth={depth} />}
      />
    </DndProvider>
  )
}

type DndTreeProps = {
  data: TreeData
}

export default DndTree
