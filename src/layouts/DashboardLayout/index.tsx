import styles from './DashboardLayout.module.css';

const DashboardLayout = ({
  asideContent,
  searchBarContent,
  mainContent,
}: DashboardLayoutProps) => (
  <div className={styles.layout}>
    {asideContent}
    <div className={styles.main}>
      {searchBarContent}
      {mainContent}
    </div>
  </div>
);

type DashboardLayoutProps = {
  asideContent: React.ReactNode;
  searchBarContent: React.ReactNode;
  mainContent: React.ReactNode;
};

export default DashboardLayout;
