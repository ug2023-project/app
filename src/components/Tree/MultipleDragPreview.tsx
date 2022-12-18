import TreeData from './TreeData'
import { TypeIcon } from './TypeIcon'

const MultipleDragPreview = ({ dragSources }: MultipleDragPreviewProps) => {
  return (
    <div
      className="pointer-events-none inline-grid grid-cols-1 items-center gap-2 rounded bg-[#1967d2] py-1 px-2 text-sm text-white shadow-tree"
      data-testid="custom-drag-preview"
    >
      {dragSources.map((node) => (
        <div className="flex items-center gap-2 text-sm text-white" key={node.id}>
          <div className="flex items-center">
            <TypeIcon droppable={node.droppable || false} fileType={node?.data?.fileType} />
          </div>
          <div className="flex items-center">{node.text}</div>
        </div>
      ))}
    </div>
  )
}

type MultipleDragPreviewProps = {
  dragSources: TreeData
}

export default MultipleDragPreview
