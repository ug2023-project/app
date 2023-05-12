import FileUpload from '@/components/FileUpload';
import GridContainer from '@/components/GridContainer';
import Sortable, { SortableProps } from '@/components/Sortable';
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Loader } from '@mantine/core';
import { useMemo, useState } from 'react';
import { Accept } from 'react-dropzone';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  useGetBookmarksQuery,
  useUploadFileMutation,
} from '../../../services/bookmarks';
import styles from './BookmarkList.module.css';
import SortMenu from './SortMenu';
import useGetSortOptions from './useGetSortOptions';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

const listProps: Partial<SortableProps> = {
  strategy: verticalListSortingStrategy,
};

const gridProps: Partial<SortableProps> = {
  adjustScale: true,
  Container: (props: any) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

const BookmarkList = () => {
  const [searchParams] = useSearchParams();
  const isSearchResult = useMemo(
    () => searchParams.get('search') !== null,
    [searchParams],
  );
  const params = useParams();
  const collectionId = params.collectionId ?? '';
  const [isList, setIsList] = useState(true);
  const [props, setProps] = useState<Partial<SortableProps>>(listProps);
  const { selectedSort } = useGetSortOptions();

  const { data: bookmarks } = useGetBookmarksQuery(
    {
      collectionId: collectionId,
      search: searchParams.get('search') ?? '',
      // sort: selectedSort ?? '',
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const [uploadFile, { isLoading, isSuccess }] = useUploadFileMutation();

  if (isLoading) {
    notifications.show({
      id: 'upload-file',
      loading: true,
      title: 'Uploading file',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });
  }
  if (isSuccess) {
    notifications.update({
      id: 'upload-file',
      color: 'teal',
      title: 'Success',
      message: 'File uploaded successfully',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000,
    });
  }

  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const handleFileDrop = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('collectionId', collectionId);
    uploadFile(formData);
  };

  const handleFileUploadError = (_: string) => {
    notifications.show({
      title: 'Error',
      message: 'File upload failed',
    });
  };

  const acceptedFiles: Accept = {
    text: ['.txt', '.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp'],
  };

  if (!bookmarks) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Loader color="violet" size="xl" />
      </div>
    );
  }

  return (
    <FileUpload
      onFileDrop={handleFileDrop}
      onDropError={handleFileUploadError}
      fileTypes={acceptedFiles}
      className={styles.bookmarkList}
      onDropStyles="before:top-0 before:left-0 before:absolute before:w-full before:h-full before:bg-amber-400 before:z-10 before:bg-amber-400/10 before:border-2 before:border-amber-400"
    >
      <div className={styles.controlPanel}>
        <Button
          onClick={() => {
            setIsList(!isList);
            setProps(isList ? gridProps : listProps);
          }}
          style={{ border: '1px solid green' }}
        >
          Change view
        </Button>
        <SortMenu />
      </div>
      {!bookmarks ? (
        <Loader color="violet" size="xl" />
      ) : bookmarks.length === 0 ? (
        <div>No bookmarks</div>
      ) : (
        <Sortable
          {...props}
          bookmarks={bookmarks}
          animateLayoutChanges={animateLayoutChanges}
          disableSorting={isSearchResult}
        />
      )}
    </FileUpload>
  );
};

export default BookmarkList;
