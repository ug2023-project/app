import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { NodeModel, RenderParams, useDragOver } from '@minoru/react-dnd-treeview'

import { TypeIcon } from './TypeIcon'

type CustomNodeProps = RenderParams & {
  node: NodeModel
  isSelected: boolean
  isDragging: boolean
  testIdPrefix?: string
  onClick: (e: React.MouseEvent, node: NodeModel) => void
  onToggle: (id: NodeModel['id']) => void
}

const CustomNode = ({ testIdPrefix = '', ...props }: CustomNodeProps) => {
  const { id } = props.node
  const indent = props.depth * 24

  const handleClick = (e: React.MouseEvent) => {
    props.onClick(e, props.node)
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    props.onToggle(props.node.id)
  }

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle)

  if (props.isSelected) {
    props.containerRef.current?.classList.add('bg-[#e8f0fe]')
  } else {
    props.containerRef.current?.classList.remove('bg-[#e8f0fe]')
  }

  if (props.isDragging) {
    props.containerRef.current?.classList.add('opacity-[50]')
  } else {
    props.containerRef.current?.classList.remove('opacity-[50]')
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="flex h-[32px] items-center"
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
      onClick={handleClick}
      {...dragOverProps}
    >
      <div
        className={`flex h-[24px] w-[24px] rotate-0 cursor-pointer items-center justify-center transition-transform duration-100 ${
          props.isOpen ? 'rotate-90' : ''
        }`}
      >
        {props.node.droppable && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={handleToggle}>
            <ChevronRightIcon data-testid={`arrow-right-icon-${id}`} className="h-[24px] w-[24px]" />
          </div>
        )}
      </div>
      <div className="flex">
        <TypeIcon />
      </div>
      <div className="pl-1">
        <p>{props.node.text}</p>
      </div>
    </div>
  )
}

export default CustomNode
