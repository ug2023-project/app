import Tree from '@/components/Tree';
import styles from './CollectionList.module.css';
import { Divider } from '@mantine/core';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { useEffect } from 'react';
import { fetchAllCollections } from '../ducks/collections/collections.actions';
import useTypedSelector from '@/hooks/useTypedSelector';
import { Resizable } from 're-resizable';
import { selectCollections } from '@/redux/selectors';
import { Droppable } from 'react-beautiful-dnd';

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
      minWidth="250px"
      maxWidth="500px"
      enable={{
        right: true,
      }}
    >
      <Droppable droppableId="collection-tree">
        {(provided) => (
          <div ref={provided.innerRef}>
            {/*<Tree data={treeData}/>*/}
            {/*<Divider size="xs"/>*/}
            <div>Divide</div>
            <Tree data={treeData} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Resizable>
  );
};

export default CollectionList;
