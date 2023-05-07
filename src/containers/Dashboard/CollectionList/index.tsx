import styles from './CollectionList.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Fragment, useEffect } from 'react';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import {
  selectCustomCollections,
  selectDefaultCollections,
} from '@/redux/selectors';
import CollectionListMenu from './CollectionListMenu';
import { SortableTree } from '@/components/Tree/SortableTree';
import { Divider } from '@mantine/core';
import { useGetCollectionsQuery } from '../../../services/bookmarks';
import { TreeItems } from '@/components/Tree/types';
import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';

const CUSTOM_COLLECTIONS_IDS: UniqueIdentifier[] = [
  'all',
  'ungrouped',
  'trash',
];

function buildTree(collections: Collection[]): TreeItems {
  const treeItemsWithChildren = collections.map((c) => ({
    id: c.id,
    title: c.title,
    children: getChildren(collections, c.id),
    collapsed: c.collapsed,
    parentId: c.parentId,
  }));
  return treeItemsWithChildren.filter((c) => c.parentId === null);
}

function getChildren(
  collections: Collection[],
  parentId: UniqueIdentifier,
): TreeItems {
  return collections
    .filter((c) => c.parentId === parentId)
    .map((c) => ({
      id: c.id,
      title: c.title,
      children: getChildren(collections, c.id),
      collapsed: c.collapsed,
    }));
}

const CollectionList = () => {
  const { data: collections = [] } = useGetCollectionsQuery();

  const defaultCollections = buildTree(
    collections.filter((c) => CUSTOM_COLLECTIONS_IDS.includes(c.id)),
  );
  const customCollections = buildTree(
    collections.filter((c) => !CUSTOM_COLLECTIONS_IDS.includes(c.id)),
  );

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
