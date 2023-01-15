import styles from './FormLayout.module.css';

const FormLayout = ({ children }: FormLayoutProps) => (
  <div className={styles.container}>{children}</div>
);

type FormLayoutProps = {
  children: React.ReactNode;
};

export default FormLayout;
