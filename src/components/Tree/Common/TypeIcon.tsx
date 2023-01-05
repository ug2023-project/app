import FolderIcon from '@/components/Icons/FolderIcon';
import styles from './TypeIcon.module.css';
import OpenFolderIcon from '@/components/Icons/OpenFolderIcon';

export const TypeIcon = ({ isOpen }: TypeIconProps) =>
  isOpen ? (
    <OpenFolderIcon height={18} width={18} className={styles.icon} />
  ) : (
    <FolderIcon height={18} width={18} className={styles.icon} />
  );

type TypeIconProps = {
  isOpen: boolean;
};

export default TypeIcon;
