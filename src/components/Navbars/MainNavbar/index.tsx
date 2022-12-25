import { Link } from '@tanstack/react-location';

import styles from './MainNavbar.module.css';

const MainNavbar = () => (
  <header className={styles.header}>
    <ul className={styles.list}>
      <li>
        <Link className={styles.link} to="/">
          /home
        </Link>
      </li>

      <li>
        <Link className={styles.link} to="/test">
          /test
        </Link>
      </li>
      <li>
        <Link className={styles.link} to="/posts/7">
          /dynamic
        </Link>
      </li>
    </ul>
  </header>
);

export default MainNavbar;
