import styles from './CollectionList.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Fragment, useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collections/collections.actions';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import { selectCollections } from '@/redux/selectors';
import CollectionListMenu from './CollectionListMenu';
import { SortableTree } from '@/components/Tree/SortableTree';
import { Divider } from '@mantine/core';

const CollectionList = () => {
  const dispatch = useTypedDispatch();

  console.time('selectCollections');
  const treeData = useTypedSelector(selectCollections);
  console.timeEnd('selectCollections');
  console.log('=================================================');

  useEffect(() => {
    dispatch(fetchAllCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Resizable
        className={styles.collectionList}
        defaultSize={{
          width: '350px',
          height: '100%',
        }}
        minWidth="250px"
        maxWidth="500px"
        enable={{
          right: true,
        }}
      >
        <Divider size="xs" />
        <CollectionListMenu />
        <SortableTree defaultItems={treeData} />
        <Divider size="xs" />
        {/*<SortableTree defaultItems={...} collapsible />*/}
      </Resizable>
    </Fragment>
  );
};

export default CollectionList;
