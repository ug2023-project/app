import { ClipboardDocumentListIcon, DocumentIcon, FolderIcon, PhotoIcon } from '@heroicons/react/24/solid'

export const TypeIcon = ({ droppable, fileType }: TypeIconProps) => {
  if (droppable) {
    return <FolderIcon className="h-[24px] w-[24px]" />
  }

  switch (fileType) {
    case 'image':
      return <PhotoIcon className="h-[24px] w-[24px]" />
    case 'csv':
      return <ClipboardDocumentListIcon className="h-[24px] w-[24px]" />
    case 'text':
      return <DocumentIcon className="h-[24px] w-[24px]" />
    default:
      return null
  }
}

type TypeIconProps = {
  droppable: boolean
  fileType?: string
}

export default TypeIcon
