import Tree from '@/components/Tree';
import styles from './CollectionList.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Fragment, useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collections/collections.actions';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import { selectCollections } from '@/redux/selectors';
import { Droppable } from 'react-beautiful-dnd';
import CollectionListMenu from './CollectionListMenu';
import { updateDropDisabled } from '@/containers/Dashboard/ducks/bookmarks/bookmarks.slice';

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
        <Droppable droppableId="collection-tree">
          {(provided) => (
            <div
              ref={provided.innerRef}
              style={{
                maxHeight: '3px',
              }}
              onMouseEnter={() => dispatch(updateDropDisabled(true))}
              onMouseLeave={() => dispatch(updateDropDisabled(false))}
            >
              {/*<Tree data={treeData}/>*/}
              {/*<Divider size="xs"/>*/}
              <CollectionListMenu />
              <Tree data={treeData} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Resizable>
    </Fragment>
  );
};

export default CollectionList;
