import styles from './Placeholder.module.css';

const Placeholder = ({ depth }: PlaceholderProps) => {
  const left = depth * 24;
  return <div className={styles.placeholder} style={{ left }}></div>;
};

type PlaceholderProps = {
  depth: number;
};

export default Placeholder;
