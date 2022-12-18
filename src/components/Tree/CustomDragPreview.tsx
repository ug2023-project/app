import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview'

import FileProperties from './FileProperties'
import { TypeIcon } from './TypeIcon'

const CustomDragPreview = ({ monitorProps: { item } }: CustomDragMenuProps) => {
  return (
    <div className="inline-grid grid-cols-2 items-center gap-2 rounded bg-[#1967d2] py-1 px-2 text-sm text-white shadow-tree">
      <div className="flex items-center">
        <TypeIcon droppable={item.droppable || false} fileType={item?.data?.fileType} />
      </div>
      <div className="flex items-center">{item.text}</div>
    </div>
  )
}

type CustomDragMenuProps = {
  monitorProps: DragLayerMonitorProps<FileProperties>
}

export default CustomDragPreview
