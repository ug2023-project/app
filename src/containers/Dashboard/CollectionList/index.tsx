import Tree from '@/components/Tree';
import styles from './CollectionList.module.css';
import { Divider } from '@mantine/core';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collection/collection.actions';
import useTypedSelector from '@/hooks/useTypedSelector';

const CollectionList = () => {
  const dispatch = useTypedDispatch();
  const isLoading = useTypedSelector((x) => x.collection.loading);
  const treeData = useTypedSelector((x) => x.collection.collections);

  useEffect(() => {
    dispatch(fetchAllCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.collectionList}>
      <span>Your favorites...</span>
      <Divider size="xs" />
      <Tree data={treeData} />
    </div>
  );
};

export default CollectionList;
