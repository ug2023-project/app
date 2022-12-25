import TreeData from '../TreeData';
import { TypeIcon } from '../Common/TypeIcon';
import styles from './MultipleDragPreview.module.css';

const MultipleDragPreview = ({ dragSources }: MultipleDragPreviewProps) => (
  <div className={styles.container} data-testid="custom-drag-preview">
    {dragSources.map((node) => (
      <div className={styles.nodePreview} key={node.id}>
        <div className={styles.centerVertical}>
          <TypeIcon />
        </div>
        <div className={styles.centerVertical}>{node.text}</div>
      </div>
    ))}
  </div>
);

type MultipleDragPreviewProps = {
  dragSources: TreeData;
};

export default MultipleDragPreview;
