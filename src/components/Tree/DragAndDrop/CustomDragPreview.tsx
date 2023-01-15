import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import TypeIcon from '../Common/TypeIcon';
import styles from './CustomDragPreview.module.css';

const CustomDragPreview = ({ monitorProps: { item } }: CustomDragMenuProps) => (
  <div className={styles.container}>
    <div className={styles.centerVertical}>
      <TypeIcon />
    </div>
    <div className={styles.centerVertical}>{item.text}</div>
  </div>
);

type CustomDragMenuProps = {
  monitorProps: DragLayerMonitorProps<unknown>;
};

export default CustomDragPreview;
