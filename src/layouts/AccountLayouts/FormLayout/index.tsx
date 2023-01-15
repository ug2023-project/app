import { Outlet } from 'react-router-dom';
import styles from './FormLayout.module.css';

const FormLayout = () => (
  <div className={styles.container}>
    <Outlet />
  </div>
);

export default FormLayout;
