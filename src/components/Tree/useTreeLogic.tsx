import React, { useCallback, useEffect, useState } from 'react';
import {
  DragLayerMonitorProps,
  DropOptions,
  isAncestor,
  PlaceholderRenderParams,
  RenderParams,
} from '@minoru/react-dnd-treeview';
import CustomDragPreview from './DragAndDrop/CustomDragPreview';
import Node from './Node';
import MultipleDragPreview from './DragAndDrop/MultipleDragPreview';
import Placeholder from './Placeholder';
import TreeData from './TreeData';
import useSelectNodeListener from './useSelectNodeListener';
import { useNavigate } from 'react-router-dom';
import TreeCollection from '@/types/TreeCollection';
import { moveCollections } from '@/containers/Dashboard/ducks/collections/collections.actions';
import useTypedDispatch from '@/hooks/useTypedDispatch';

const useTreeLogic = ({ data }: UseTreeLogicProps) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [selectedNodes, setSelectedNodes] = useState<TreeData>([]);
  const [treeData, setTreeData] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const [isCtrlPressing, setIsCtrlPressing] = useState(false);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  // const sortSelectedNodes = () => {
  //   const indexes = selectedNodes.reduce<Record<CollectionId, number>>((acc, node) => {
  //     acc[node.id] = treeData.findIndex(n => n.id === node.id);
  //     return acc;
  //   }, {});
  //   const sortedSelectedNodes = [...selectedNodes].sort((a, b) => {
  //     const indexA = indexes[a.id];
  //     const indexB = indexes[b.id];
  //     return indexA - indexB;
  //   });
  //   setSelectedNodes(sortedSelectedNodes);
  // };

  useSelectNodeListener({ setSelectedNodes, setIsCtrlPressing });

  const handleSingleSelect = useCallback((node: TreeCollection) => {
    setSelectedNodes([node]);
    navigate(`/collections/${node.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMultiSelect = useCallback(
    (clickedNode: TreeCollection) => {
      const selectedIds = selectedNodes.map((n) => n.id);

      if (selectedIds.includes(clickedNode.id)) {
        setSelectedNodes(
          selectedNodes.filter(
            (selectedNode) => selectedNode.id !== clickedNode.id,
          ),
        );
        return;
      }

      if (
        selectedIds.some((selectedId) =>
          isAncestor(treeData, selectedId, clickedNode.id),
        )
      ) {
        return;
      }

      const updateNodes = [...selectedNodes].filter(
        (selectedNode) =>
          !isAncestor(treeData, clickedNode.id, selectedNode.id),
      );

      if (selectedNodes.length < 1) {
        navigate(`/collections/${clickedNode.id}`);
      }

      setSelectedNodes([...updateNodes, clickedNode]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedNodes, treeData],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent, node: TreeCollection) => {
      if (e.ctrlKey || e.metaKey) {
        handleMultiSelect(node);
      } else {
        handleSingleSelect(node);
      }
    },
    [handleMultiSelect, handleSingleSelect],
  );

  const handleDragStart = useCallback(
    (node: TreeCollection) => {
      const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
      // sortSelectedNodes();
      setIsDragging(true);

      if (!isCtrlPressing && isSelectedNode) {
        return;
      }

      if (!isCtrlPressing) {
        setSelectedNodes([node]);
        return;
      }

      if (!selectedNodes.some((n) => n.id === node.id)) {
        setSelectedNodes([...selectedNodes, node]);
      }
    },
    [isCtrlPressing, selectedNodes],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setIsCtrlPressing(false);
    setSelectedNodes([]);
  }, []);

  const handleDrop = useCallback(
    async (tree: TreeData, options: DropOptions) => {
      const { dropTargetId, relativeIndex } = options;

      dispatch(
        moveCollections({
          body: {
            parentId: dropTargetId,
            index: relativeIndex ?? 0,
            collectionIds: selectedNodes.map((node) => node.id),
          },
        }),
      );

      setSelectedNodes([]);
    },
    [dispatch, selectedNodes],
  );

  const handleDragPreviewRender = useCallback(
    (props: DragLayerMonitorProps<unknown>) => {
      if (selectedNodes.length > 1) {
        return <MultipleDragPreview dragSources={selectedNodes} />;
      }

      return <CustomDragPreview monitorProps={props} />;
    },
    [selectedNodes],
  );

  const handleCanDrop = useCallback(
    (_tree: TreeCollection[], { dragSource, dropTargetId }: DropOptions) => {
      if (
        selectedNodes.some((selectedNode) => selectedNode.id === dropTargetId)
      ) {
        return false;
      }
      if (dragSource?.parent === dropTargetId) {
        return true;
      }
    },
    [selectedNodes],
  );

  const handleRender = useCallback(
    (node: TreeCollection, options: RenderParams) => {
      const selected = selectedNodes.some(
        (selectedNode) => selectedNode.id === node.id,
      );
      return (
        <Node
          node={node}
          {...options}
          isSelected={selected}
          isDragging={selected && isDragging}
          onClick={handleClick}
        />
      );
    },
    [handleClick, isDragging, selectedNodes],
  );

  const handlePlaceholderRender = useCallback(
    (_node: TreeCollection, { depth }: PlaceholderRenderParams) => (
      <Placeholder depth={depth} />
    ),
    [],
  );

  return {
    handleDragStart,
    handleDragEnd,
    handleDrop,
    treeData,
    handleDragPreviewRender,
    handleCanDrop,
    handleRender,
    handlePlaceholderRender,
  };
};

type UseTreeLogicProps = {
  data: TreeData;
};

export default useTreeLogic;
