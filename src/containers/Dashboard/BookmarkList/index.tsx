import { useParams } from 'react-router-dom';
import styles from './BookmarkList.module.css';

const BookmarkList = () => {
  const params = useParams();

  return (
    <main className={styles.bookmarkList}>
      <h2>{params.collectionId}</h2>
    </main>
  );
};

export default BookmarkList;
