import { useState } from 'react'
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview'

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
  const [labelText, setLabelText] = useState(node.text)
  const [visibleInput, setVisibleInput] = useState(false)
  const indent = depth * 24

  const handleClick = (e: React.MouseEvent) => {
    onClick(e, node)
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle(node.id)
  }

  const handleShowInput = () => {
    setVisibleInput(true)
  }

  const handleCancel = () => {
    setVisibleInput(false)
    setLabelText(node.text)
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value)
  }

  const handleSubmit = () => {
    setVisibleInput(false)
    onTextChange(node.id, labelText)
  }

  const dragOverProps = useDragOver(node.id, isOpen, onToggle)

  if (isSelected) {
    containerRef.current?.classList.add('bg-[#e8f0fe]')
  } else {
    containerRef.current?.classList.remove('bg-[#e8f0fe]')
  }

  if (isDragging) {
    containerRef.current?.classList.add('opacity-[50]')
  } else {
    containerRef.current?.classList.remove('opacity-[50]')
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
  }
}

type UseNodeLogicProps = {
  onTextChange: (id: NodeModel['id'], value: string) => void
  onClick: (e: React.MouseEvent, node: NodeModel) => void
  onToggle: (id: NodeModel['id']) => void
  node: NodeModel
  depth: number
  isSelected: boolean
  isDragging: boolean
  containerRef: React.RefObject<HTMLElement>
  isOpen: boolean
}

export default useNodeLogic
