import { useCallback } from 'react';
import { FileRejection } from 'react-dropzone';

const useOnFileDropUtils = ({ onFileDrop, onError }: UseOnFileDropUtils) => {
  const onDrop = useCallback(
    (files?: File[]) => {
      if (files && files.length > 0) {
        onFileDrop(files[0]);
      }
    },
    [onFileDrop],
  );

  const onDropRejected = useCallback(
    (files: FileRejection[]) => {
      if (onError) {
        onError(files[0].errors[0].message);
      }
    },
    [onError],
  );

  return { onDrop, onDropRejected };
};

type UseOnFileDropUtils = {
  onFileDrop: (file: File) => void;
  onError?: (error: string) => void;
};

export default useOnFileDropUtils;
