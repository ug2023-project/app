import classNames from 'classnames';
import { useDropzone, Accept } from 'react-dropzone';
import useOnFileDropUtils from './useOnFileDropUtils';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const FileUpload = ({
  onFileDrop,
  onDropError,
  fileTypes,
  maxSize = 1000000,
  acceptMultiple = false,
  children,
  onDropStyles,
  className,
}: PropsWithChildren<FileUploadProps>) => {
  const { onDrop, onDropRejected } = useOnFileDropUtils({
    onFileDrop,
    onError: onDropError,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: fileTypes,
    maxSize,
    multiple: acceptMultiple,
    noClick: true,
  });

  const dropStyles = onDropStyles ?? '';

  return (
    <div
      className={twMerge(
        classNames(
          'relative h-full w-full',
          {
            [dropStyles]: isDragActive,
          },
          className,
        ),
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

type FileUploadProps = {
  onFileDrop: (file: File) => void;
  onDropError?: (error: string) => void;
  fileTypes: Accept;
  maxSize?: number;
  acceptMultiple?: boolean;
  onDropStyles?: string;
  className?: string;
};

export default FileUpload;
