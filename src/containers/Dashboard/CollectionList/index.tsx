import styles from './CollectionList.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Fragment, useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collections/collections.actions';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import {
  selectCustomCollections,
  selectDefaultCollections,
} from '@/redux/selectors';
import CollectionListMenu from './CollectionListMenu';
import { SortableTree } from '@/components/Tree/SortableTree';
import { Divider } from '@mantine/core';
import { TreeItems } from '@/components/Tree/types';
import { UniqueIdentifier } from '@dnd-kit/core';

const defaultCollections: TreeItems = [
  {
    id: 0,
    title: 'All bookmarks',
    children: [],
  },
  {
    id: -1,
    title: 'Unsorted',
    children: [],
  },
  {
    id: -99,
    title: 'Trash',
    children: [],
  },
];

const CollectionList = () => {
  const dispatch = useTypedDispatch();

  console.time('selectCollections');
  const defaultCollections = useTypedSelector(selectDefaultCollections);
  const customCollections = useTypedSelector(selectCustomCollections);
  console.timeEnd('selectCollections');

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
        <div>--- Some user panel ---</div>
        <SortableTree items={defaultCollections} dragDisabled={true} />
        <Divider size="xs" />
        <CollectionListMenu />
        <SortableTree items={customCollections} />
        <Divider size="xs" />
      </Resizable>
    </Fragment>
  );
};

export default CollectionList;
