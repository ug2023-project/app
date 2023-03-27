import { Outlet, useParams } from 'react-router-dom';
import styles from './MainLayout.module.css';
import React from 'react';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import useTypedSelector from '@/hooks/useTypedSelector';
import { selectDraggingBookmarkIds } from '@/redux/selectors';

const MainLayout = ({ asideContent, searchBarContent }: MainLayoutProps) => {
  const dispatch = useTypedDispatch();
  const params = useParams();
  const collectionId = parseInt(params.collectionId as unknown as string);
  const draggingBookmarkIds = useTypedSelector(selectDraggingBookmarkIds);

  return (
    <div className={styles.layout}>
      {asideContent}
      <div className={styles.main}>
        {searchBarContent}
        <Outlet />
      </div>
    </div>
  );
};

type MainLayoutProps = {
  asideContent: React.ReactNode;
  searchBarContent: React.ReactNode;
};

export default MainLayout;
