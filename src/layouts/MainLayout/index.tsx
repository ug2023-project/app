import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import React from 'react';

const MainLayout = ({ asideContent, searchBarContent }: MainLayoutProps) => (
  <div className={styles.layout}>
    {asideContent}
    <div className={styles.main}>
      {searchBarContent}
      <Outlet />
    </div>
  </div>
);

type MainLayoutProps = {
  asideContent: React.ReactNode;
  searchBarContent: React.ReactNode;
};

export default MainLayout;
