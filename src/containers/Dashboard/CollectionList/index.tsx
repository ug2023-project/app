import Tree from '@/components/Tree';
import styles from './CollectionList.module.css';
import { Divider } from '@mantine/core';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collection/collection.actions';

const sampleData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 3,
    parent: 1,
    droppable: true,
    text: 'Folder 3',
  },
  {
    id: 2,
    parent: 1,
    droppable: true,
    text: 'Folder 2',
  },

  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 4',
  },
  {
    id: 5,
    parent: 0,
    droppable: true,
    text: 'Folder 5',
  },
  {
    id: 6,
    parent: 0,
    droppable: true,
    text: 'Folder 6',
  },
  {
    id: 7,
    parent: 0,
    droppable: true,
    text: 'Folder 7',
  },
];
const CollectionList = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchAllCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.collectionList}>
      <span>Your favorites...</span>
      <Divider size="xs" />
      <Tree data={sampleData} />
    </div>
  );
};

export default CollectionList;
