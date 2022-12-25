import { useCallback, useState } from 'react';
import {
  DragLayerMonitorProps,
  DropOptions,
  isAncestor,
  NodeModel,
  PlaceholderRenderParams,
  RenderParams,
} from '@minoru/react-dnd-treeview';

import CustomDragPreview from './DragAndDrop/CustomDragPreview';
import CustomNode from './Node';
import MultipleDragPreview from './DragAndDrop/MultipleDragPreview';
import Placeholder from './Placeholder';
import TreeData from './TreeData';
import useSelectNodeListener from './useSelectNodeListener';

const useTreeLogic = ({ data }: UseTreeLogicProps) => {
  const [selectedNodes, setSelectedNodes] = useState<TreeData>([]);
  const [treeData, setTreeData] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const [isCtrlPressing, setIsCtrlPressing] = useState(false);

  useSelectNodeListener({ setSelectedNodes, setIsCtrlPressing });

  const handleTextChange = useCallback(
    (id: NodeModel['id'], value: string) => {
      const newTree = treeData.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            text: value,
          };
        }

        return node;
      });

      setTreeData(newTree);
    },
    [treeData],
  );

  const handleSingleSelect = useCallback((node: NodeModel) => {
    setSelectedNodes([node]);
  }, []);

  const handleMultiSelect = useCallback(
    (clickedNode: NodeModel) => {
      const selectedIds = selectedNodes.map((n) => n.id);

      if (selectedIds.includes(clickedNode.id)) {
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

      setSelectedNodes([...updateNodes, clickedNode]);
    },
    [selectedNodes, treeData],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent, node: NodeModel) => {
      if (e.ctrlKey || e.metaKey) {
        handleMultiSelect(node);
      } else {
        handleSingleSelect(node);
      }
    },
    [handleMultiSelect, handleSingleSelect],
  );

  const handleDragStart = useCallback(
    (node: NodeModel) => {
      const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
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
    (newTree: TreeData, options: DropOptions) => {
      const { dropTargetId } = options;

      setTreeData(
        newTree.map((node) => {
          if (
            selectedNodes.some((selectedNode) => selectedNode.id === node.id)
          ) {
            return {
              ...node,
              parent: dropTargetId,
            };
          }

          return node;
        }),
      );

      setSelectedNodes([]);
    },
    [selectedNodes],
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
    (
      _tree: NodeModel<unknown>[],
      { dragSource, dropTargetId }: DropOptions<unknown>,
    ) => {
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
    (node: NodeModel, options: RenderParams) => {
      const selected = selectedNodes.some(
        (selectedNode) => selectedNode.id === node.id,
      );
      return (
        <CustomNode
          node={node}
          {...options}
          isSelected={selected}
          isDragging={selected && isDragging}
          onClick={handleClick}
          onTextChange={handleTextChange}
        />
      );
    },
    [handleClick, handleTextChange, isDragging, selectedNodes],
  );

  const handlePlaceholderRender = useCallback(
    (_node: NodeModel, { depth }: PlaceholderRenderParams) => (
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
