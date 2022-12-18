import React from 'react'
import { PencilIcon } from '@heroicons/react/24/solid'
import { CheckIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Input } from '@mantine/core'
import { NodeModel, RenderParams } from '@minoru/react-dnd-treeview'

import { TypeIcon } from './TypeIcon'
import useNodeLogic from './useNodeLogic'

type CustomNodeProps = RenderParams & {
  node: NodeModel
  isSelected: boolean
  isDragging: boolean
  testIdPrefix?: string
  onClick: (e: React.MouseEvent, node: NodeModel) => void
  onToggle: (id: NodeModel['id']) => void
  onTextChange: (id: NodeModel['id'], value: string) => void
}

const CustomNode = ({
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
}: CustomNodeProps) => {
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
  })

  return (
    <div
      className="flex h-[32px] items-center"
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${node.id}`}
      onClick={handleClick}
      {...dragOverProps}
    >
      <div
        className={`flex h-[24px] w-[24px] rotate-0 cursor-pointer items-center justify-center transition-transform duration-100 ${
          isOpen ? 'rotate-90' : ''
        }`}
      >
        {node.droppable && (
          <div onClick={handleToggle}>
            <ChevronRightIcon data-testid={`arrow-right-icon-${node.id}`} className="h-[24px] w-[24px]" />
          </div>
        )}
      </div>
      <div>
        <TypeIcon />
      </div>
      {visibleInput ? (
        <div className="flex items-center">
          <Input placeholder={node.text} value={labelText} onChange={handleChangeText} />
          <div className="relative h-[20px] w-[20px]" onClick={handleSubmit}>
            <CheckIcon className="h-full w-full" />
          </div>
          <div className="relative h-[20px] w-[20px]" onClick={handleCancel}>
            <XMarkIcon className="h-full w-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="pl-2">
            <p>{node.text}</p>
          </div>
          <div className="relative ml-5 h-[20px] w-[20px]" onClick={handleShowInput}>
            <PencilIcon className="h-full w-full" />
          </div>
        </>
      )}
    </div>
  )
}

export default CustomNode
