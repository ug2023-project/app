import { Link } from '@tanstack/react-location';

import styles from './MainNavbar.module.css';
import LanguageSelect from '@/components/LanguageSelect';

const MainNavbar = () => (
  <header className={styles.header}>
    <nav>
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
    </nav>
    <nav>
      <ul className={styles.list}>
        <li>
          <LanguageSelect />
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavbar;
