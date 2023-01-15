import Tree from '@/components/Tree';
import styles from './CollectionList.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collections/collections.actions';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import { selectCollections } from '@/redux/selectors';
import CollectionListMenu from './CollectionListMenu';

const CollectionList = () => {
  const dispatch = useTypedDispatch();
  const treeData = useTypedSelector(selectCollections);

  useEffect(() => {
    dispatch(fetchAllCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!treeData.length) return <div>Loading...</div>;

  return (
    <Resizable
      className={styles.collectionList}
      minWidth="200px"
      maxWidth="500px"
      enable={{
        right: true,
      }}
    >
      {/*<Tree data={treeData}/>*/}
      {/*<Divider size="xs"/>*/}
      <div>Divide</div>
      <CollectionListMenu />
      <Tree data={treeData} />
    </Resizable>
  );
};

export default CollectionList;
