import { Link } from '@tanstack/react-location';

import styles from './MainNavbar.module.css';
import LanguageSelect from '@/components/LanguageSelect';
import ThemeSwitcher from '@/components/ThemeSwitcher';

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
        <li>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavbar;
