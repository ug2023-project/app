import Tree from '@/components/Tree';
import styles from './CollectionList.module.css';
import { Divider } from '@mantine/core';

const sampleData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
  },
  {
    id: 3,
    parent: 0,
    droppable: true,
    text: 'Folder 3',
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
const CollectionList = () => (
  <div className={styles.collectionList}>
    <span>Your favorites...</span>
    <Divider size="xs" />
    <Tree data={sampleData} />
  </div>
);

export default CollectionList;
