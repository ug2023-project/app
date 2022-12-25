import { useEffect } from 'react';
import TreeData from './TreeData';

const useSelectNodeListener = ({
  setIsCtrlPressing,
  setSelectedNodes,
}: UseSelectNodeListenerProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'escape') {
        setSelectedNodes([]);
      } else if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressing(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'control' || e.key.toLowerCase() === 'meta') {
        setIsCtrlPressing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

type UseSelectNodeListenerProps = {
  setSelectedNodes: (nodes: TreeData) => void;
  setIsCtrlPressing: (isCtrlPressing: boolean) => void;
};

export default useSelectNodeListener;
