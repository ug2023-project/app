import { Tree as DndTree } from '@minoru/react-dnd-treeview';
import TreeData from './TreeData';
import useTreeLogic from './useTreeLogic';
import styles from './Tree.module.css';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { CollectionId } from '@/types/TreeCollection';
import { expandCollections } from '@/containers/Dashboard/ducks/collections/collections.actions';

const Tree = ({ data }: DndTreeProps) => {
  const dispatch = useTypedDispatch();
  const initialOpenCollections = data
    .filter((item) => item.data?.expanded)
    .map((item) => item.id);

  const {
    handleDragEnd,
    handleDragStart,
    handleDrop,
    treeData,
    handleDragPreviewRender,
    handleCanDrop,
    handleRender,
    handlePlaceholderRender,
  } = useTreeLogic({ data });

  const handleOnChangeOpen = (openedCollectionIds: CollectionId[]) => {
    dispatch(expandCollections(openedCollectionIds));
  };

  return (
    <div
      style={
        {
          // border: '1px solid red',
        }
      }
    >
      <DndTree
        tree={treeData}
        rootId={0}
        render={handleRender}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragPreviewRender={handleDragPreviewRender}
        onDrop={handleDrop}
        classes={{
          root: styles.root,
          draggingSource: styles.draggingSource,
          placeholder: styles.placeholder,
          dropTarget: styles.dropTarget,
        }}
        sort={false}
        // enableAnimateExpand
        insertDroppableFirst={false}
        canDrop={handleCanDrop}
        dropTargetOffset={10}
        initialOpen={initialOpenCollections}
        onChangeOpen={handleOnChangeOpen}
        placeholderRender={handlePlaceholderRender}
      />
    </div>
  );
};

type DndTreeProps = {
  data: TreeData;
};

export default Tree;
