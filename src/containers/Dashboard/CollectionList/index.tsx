import styles from './CollectionList.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Fragment, useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collections/collections.actions';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import { selectCollections } from '@/redux/selectors';
import CollectionListMenu from './CollectionListMenu';
import { SortableTree } from '@/components/Tree/SortableTree';
import { TreeItems } from '@/components/Tree/types';

const items: TreeItems = [
  {
    id: 'Home',
    children: [],
  },
  {
    id: 'Collections',
    children: [
      { id: 'Spring', children: [] },
      { id: 'Summer', children: [] },
      { id: 'Fall', children: [] },
      { id: 'Winter', children: [] },
    ],
  },
  {
    id: 'About Us',
    children: [],
  },
  {
    id: 'My Account',
    children: [
      { id: 'Addresses', children: [] },
      { id: 'Order History', children: [] },
    ],
  },
];

const CollectionList = () => {
  const dispatch = useTypedDispatch();
  const treeData = useTypedSelector(selectCollections);

  useEffect(() => {
    dispatch(fetchAllCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Resizable
        className={styles.collectionList}
        minWidth="250px"
        maxWidth="500px"
        enable={{
          right: true,
        }}
      >
        <SortableTree defaultItems={items} collapsible removable />
        {/*<Tree data={treeData}/>*/}
        {/*<Divider size="xs"/>*/}
        <CollectionListMenu />
      </Resizable>
    </Fragment>
  );
};

export default CollectionList;
